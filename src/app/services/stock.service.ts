import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private apiService: MainApiService) { }

  getAllStock() {
    return this.apiService.get('/stock/');
  }

  createStock(stock) {
    return this.apiService.post('/stock/', stock);
  }
  deleteStock(stock_id) {
    return this.apiService.delete('/stock/' + stock_id);
  }
  editStock(stock_id, stock) {
    return this.apiService.put('/stock/' + stock_id, stock);
  }
  getStockById(stock_id) {
    return this.apiService.get('/stock/stock', { stock_id });
  }
}
