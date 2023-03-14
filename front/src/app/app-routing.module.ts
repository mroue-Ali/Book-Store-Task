import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {CartComponent} from "./cart/cart.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrderItemsComponent} from "./order-items/order-items.component";


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'order/:id', component: OrderItemsComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'list', component: ListComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
