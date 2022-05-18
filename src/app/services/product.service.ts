import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: MainApiService) { }

  //api/v1/user-service/api/v1/users

  createProduct(products) {
    return this.apiService.post('api/v1/product-service/api/v1/products', products);
  }
  getAllProdutcs() {
    return this.apiService.get('api/v1/product-service/api/v1/products');
  }
  deleteProduct(id) {
    return this.apiService.delete('api/v1/product-service/api/v1/products/' + id);
  }
  editProduct(id, product) {
    return this.apiService.put('api/v1/product-service/api/v1/products/' + id, product);
  }
  getProducteById(id) {
    return this.apiService.get('api/v1/product-service/api/v1/products', { id });
  }
}
