import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apiService: MainApiService) {}

  createOrder(order) {
    return this.apiService.post('api/v1/order-service/api/v1/orders', order);
  }

  getAllOrders() {
    return this.apiService.get('api/v1/order-service/api/v1/orders');
  }

  deleteOrder(id) {
    return this.apiService.delete('api/v1/order-service/api/v1/orders/' + id);
  }
  editOrder(id, order) {
    return this.apiService.put('api/v1/order-service/api/v1/orders/' + id, order);
  }
  getOrderById(id) {
    return this.apiService.get('api/v1/order-service/api/v1/orders?id='+ id );
  }
}
