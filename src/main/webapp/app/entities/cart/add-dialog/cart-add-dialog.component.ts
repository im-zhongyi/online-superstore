import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICart } from '../cart.model';
import { CartService } from '../service/cart.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cart-add-dialog.component.html',
})
export class CartAddDialogComponent {
  cart?: ICart;

  constructor(protected cartService: CartService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  addToCart(): void {
//     this.cartService.delete(id).subscribe(() => {
//       this.activeModal.close(ITEM_DELETED_EVENT);
//     });
  }
}
