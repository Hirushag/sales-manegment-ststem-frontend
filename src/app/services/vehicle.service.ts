import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apiService: MainApiService) {}

  createVehicle(vehicle) {
    return this.apiService.post('/vehicle/', vehicle);
  }

  getAllVehicles() {
    return this.apiService.get('/vehicle/');
  }

  deleteVehicle(id) {
    return this.apiService.delete('/vehicle/' + id);
  }
  editVehicle(id, vehicle) {
    return this.apiService.put('/vehicle/' + id, vehicle);
  }
  getVehicleById(id) {
    return this.apiService.get('/vehicle/vehicle', { id });
  }
}
