import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Data, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders,HttpResponse } from '@angular/common/http';
import { IProductListing } from '../product-listing.model';
import { ICart } from '../../cart/cart.model';
import { EntityArrayResponseType, CartService } from '../../cart/service/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartAddDialogComponent } from '../../cart/add-dialog/cart-add-dialog.component';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import {combineLatest, filter,switchMap,Observable, tap} from 'rxjs';
@Component({
  selector: 'jhi-product-listing-detail',
  templateUrl: './product-listing-detail.component.html',
})
export class ProductListingDetailComponent implements OnInit {
  productListing: IProductListing | null = null;
  cart: ICart |null = null;
  carts:ICart[] |null = null;
  page = 1;
  predicate = 'id';
  isLoading =false;
  ascending = true;
  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  editForm = this.fb.group({
    id:[],
    userId:[],
    quantity:[]
  })
  userId:string ='';
  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected modalService: NgbModal,
    protected cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productListing }) => {
      this.productListing = productListing;
    });
  }

  previousState(): void {
    window.history.back();
  }

  addToCart(): void{
//    const modalRef = this.modalService.open(CartAddDialogComponent, { size: 'lg', backdrop: 'static' });
// //    modalRef.componentInstance.cart = cart;
//    modalRef.closed
//      .pipe(
// //        filter(reason => reason === ITEM_DELETED_EVENT),
//        switchMap(() => this.loadFromBackendWithRouteInformations())
//      )
//      .subscribe({
//        next: (res: EntityArrayResponseType) => {
//          this.onResponseSuccess(res);
//        },
//      });
    this.cartService.query({
      'userId.equals':1
    }).subscribe((res:HttpResponse<any>)=>{
      this.cart =res.body
      console.log(res.body)
    })
//     this.isSaving = true;
//     const productListing = this.productListingFormService.getProductListing(this.editForm);
//     if (productListing.id !== null) {
//       this.subscribeToSaveResponse(this.productListingService.update(productListing));
//     } else {
//       this.subscribeToSaveResponse(this.productListingService.create(productListing));
//     }
  }
    protected loadFromBackendWithRouteInformations(): Observable<any> {
      return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
      );
    }
    protected onResponseSuccess(response: EntityArrayResponseType): void {
      this.fillComponentAttributesFromResponseHeader(response.headers);
      const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
      this.carts = dataFromBody;
    }
    protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
      const page = params.get(PAGE_HEADER);
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
    }
    protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
      this.isLoading = true;
      const pageToLoad: number = page ?? 1;
      const queryObject = {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.getSortQueryParam(predicate, ascending),
      };
      return this.cartService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
    }
     protected fillComponentAttributesFromResponseBody(data: ICart[] | null): ICart[] {
        return data ?? [];
      }

      protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
        this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
      }
        protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
          const ascendingQueryParam = ascending ? ASC : DESC;
          if (predicate === '') {
            return [];
          } else {
            return [predicate + ',' + ascendingQueryParam];
          }
        }
}
