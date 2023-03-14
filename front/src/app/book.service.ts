import { Injectable } from '@angular/core';
import {BookListService} from "./book-list.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
books: any []=[];
 constructor(private bookList:BookListService) {

   this.bookList.getData().subscribe(data=>{
     this.books=data as any[];
   })

   const cartData = localStorage.getItem('cart');
   if (cartData) {
     this.cart = JSON.parse(cartData);
   }
 }
cart: any []=[];
 getBookById(id:number){
   return this.books.find(book=>book.id===id);
 }

  addToCart(book: any) {
    const existingBook = this.cart.find(item => item.id === book.id);

    if (existingBook) {
      existingBook.quantity += 1;
    } else {
      this.cart.push({...book, quantity: 1});
    }
      console.log(this.cart)
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}
