import { Component } from '@angular/core';
import {OrdersListService} from "../orders-list.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
orders:any[]=[]
  constructor(private ordersService:OrdersListService) {
  this.ordersService.getData().subscribe(data=>{
    this.orders=data as any[];
  })

  }
}
