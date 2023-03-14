import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersListService {
  constructor(private http: HttpClient) {}

  getData() {
    let url="http://localhost:3000/orders";
    return this.http.get(url);
  }
  getOrderById(id:number){
    let url="http://localhost:3000/orders/"+id;
    return this.http.get(url);
  }
}
