import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrdersListService} from "../orders-list.service";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent {
order_items:any[]=[]
  constructor(private route:ActivatedRoute,private orderService:OrdersListService) {
  const orderId=this.route.snapshot.paramMap.get('id');
  this.orderService.getOrderById(Number(orderId)).subscribe(order=>{
    this.order_items=order as any[];
  })


  }
}
