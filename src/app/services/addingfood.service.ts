import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class AddingfoodService {
  constructor(private apiService: MainApiService) {}

  getAllAddingfoods() {
    return this.apiService.get('/addingfood/');
  }

  createAddingfood(addingfood) {
    return this.apiService.post('/addingfood/', addingfood);
  }
  deleteFood(food_id) {
    return this.apiService.delete('/addingfood/' + food_id);
  }
  editFood(food_id, addingfood){ 
    return this.apiService.put('/addingfood/' + food_id, addingfood);
  }
  getFoodById(food_id) {
    return this.apiService.get('/addingfood/addingfood', { food_id });
  }
}
