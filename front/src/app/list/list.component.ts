import { Component } from '@angular/core';
import {BookListService} from "../book-list.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
books:any[]=[]

  constructor(private bookList:BookListService) {
this.bookList.getData().subscribe(data=>{
  this.books=data as any[];
})

}



}
