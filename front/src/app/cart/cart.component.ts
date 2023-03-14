import { Component } from '@angular/core';
import {CheckoutService} from "../checkout.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any []=[];

  constructor(private checkoutService: CheckoutService) {

   const cartData= localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  checkout() {
    const cart = this.cart.map(({ id, quantity }) => ({ bookId: id, quantity }));

    console.log(cart);
    console.log(this.cart)
    this.checkoutService.checkout(cart).subscribe(
      response =>{
        console.log('Checkout successful!', response)
        localStorage.removeItem('cart');
        this.cart = [];

      },
      error => console.error('Error while checking out:', error)
    );
  }
  removeBook(book: any) {
    const index = this.cart.findIndex(b => b.id === book.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

}
