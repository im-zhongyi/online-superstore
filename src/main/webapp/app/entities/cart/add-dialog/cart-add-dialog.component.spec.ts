// jest.mock('@ng-bootstrap/ng-bootstrap');
//
// import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
// import { HttpResponse } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//
// import { CartService } from '../service/cart.service';
//
// import { CartAddDialogComponent } from './cart-add-dialog.component';
//
// describe('Cart Management Add Component', () => {
//   let comp: CartDeleteDialogComponent;
//   let fixture: ComponentFixture<CartAddDialogComponent>;
//   let service: CartService;
//   let mockActiveModal: NgbActiveModal;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       declarations: [CartAddDialogComponent],
//       providers: [NgbActiveModal],
//     })
//       .overrideTemplate(CartAddDialogComponent, '')
//       .compileComponents();
//     fixture = TestBed.createComponent(CartAddDialogComponent);
//     comp = fixture.componentInstance;
//     service = TestBed.inject(CartService);
//     mockActiveModal = TestBed.inject(NgbActiveModal);
//   });
//
//   describe('addToCart', () => {
//     it('Should call add service on addToCart', inject(
//       [],
//       fakeAsync(() => {
//         // GIVEN
//         jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));
//
//         // WHEN
//         comp.addToCart(123);
//         tick();
//
//         // THEN
//         expect(service.delete).toHaveBeenCalledWith(123);
//         expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
//       })
//     ));
//
//     it('Should not call delete service on clear', () => {
//       // GIVEN
//       jest.spyOn(service, 'delete');
//
//       // WHEN
//       comp.cancel();
//
//       // THEN
//       expect(service.delete).not.toHaveBeenCalled();
//       expect(mockActiveModal.close).not.toHaveBeenCalled();
//       expect(mockActiveModal.dismiss).toHaveBeenCalled();
//     });
//   });
// });
