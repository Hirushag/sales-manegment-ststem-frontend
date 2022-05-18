import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private apiService: MainApiService) { }

  getAllSuppliers() {
    return this.apiService.get('api/supplier/all');
  }

  createSupplier(supplier) {
    return this.apiService.post('api/supplier/', supplier);
  }
  deleteSupplier(id) {
    return this.apiService.delete('api/supplier/delete/' + id);
  }
  editSupplier(id, supplier) {
    return this.apiService.put('api/supplier/edit' + id, supplier);
  }
  getStockById(id) {
    return this.apiService.get('api/supplier/'+  id );
  }
}
