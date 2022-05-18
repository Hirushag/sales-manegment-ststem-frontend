import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: MainApiService) {}

  createEmployee(employee) {
    return this.apiService.post('/employee/', employee);
  }

  getAllEmployees() {
    return this.apiService.get('/employee/');
  }

  deleteEmployee(id) {
    return this.apiService.delete('/employee/' + id);
  }
  editEmployee(id, employee) {
    return this.apiService.put('/employee/' + id, employee);
  }
  getEmployeeById(id) {
    return this.apiService.get('/employee/employee', { id });
  }
}
