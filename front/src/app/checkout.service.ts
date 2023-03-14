import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  checkout(cart: any[]) {
    const data={cart:cart};
    return this.http.post(this.apiUrl, data);
  }
}
