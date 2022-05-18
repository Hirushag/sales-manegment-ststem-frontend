import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private apiService: MainApiService) {}

  getAllDeliverys() {
    return this.apiService.get('/delivery/');
  }
  registerDelivery(delivery) {
    return this.apiService.post('/delivery/', delivery);
  }
  deleteDelivery(id) {
    return this.apiService.delete('/delivery/' + id);
  }

  editDelivery(id, delivery) {
    return this.apiService.put('/delivery/' + id, delivery);
  }
  getDeliveryById(id) {
    return this.apiService.get('/delivery/delivery', { id });
  }
}
