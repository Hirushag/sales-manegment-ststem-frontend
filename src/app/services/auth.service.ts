import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';
import { JwtService } from './jwt.service';
import { Credential } from '../shared/models/credential';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: MainApiService,
    private jwtService: JwtService
  ) {}

  attemptLogin(credentials: Credential) {
    this.destroyAuth();
    return this.apiService.get('/user/login', credentials);
  }

  registerUser(user) {
    return this.apiService.post('api/v1/user-service/api/v1/users', user);
  }



  getUserById(userId) {
    return this.apiService.get('api/v1/user-service/api/v1/users', userId);
  }

  getUsersByRole() {
    return this.apiService.get('api/v1/user-service/api/v1/users');
  }

  editUser(userId, user) {
    return this.apiService.put(
      'api/v1/user-service/api/v1/users/' + userId,
      user
    );

  }

  deleteUser(userId) {
    // return this.apiService.delete('/user/', { userId });
    return this.apiService.delete('api/v1/user-service/api/v1/users/' + userId);
  }

  // Store Authorization Information
  setAuth(token: string) {
    // Save JWT sent from server in localStorage
    this.jwtService.saveToken(token);
  }

  destroyAuth() {
    // Remove JWT from localStorage
    this.jwtService.destroyToken();
  }
}
