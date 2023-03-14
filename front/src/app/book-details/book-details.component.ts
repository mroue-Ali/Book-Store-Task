import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../book.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book:any;
  constructor(private route: ActivatedRoute,private bookService: BookService) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.book=this.bookService.getBookById(id);
    });

  }
 addToCart(){
   console.log(this.book)
    this.bookService.addToCart(this.book)
 }
}
