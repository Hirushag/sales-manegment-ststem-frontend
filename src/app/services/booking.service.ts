import { Injectable } from '@angular/core';
import { MainApiService } from './main-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private apiService: MainApiService) {}

  getAllBookings() {
    return this.apiService.get('/booking/');
  }

  createBooking(booking) {
    return this.apiService.post('/booking/', booking);
  }
  deleteBooking(booking_id) {
    return this.apiService.delete('/booking/' + booking_id);
  }
  editBooking(booking_id, booking) {
    return this.apiService.put('/booking/' + booking_id, booking);
  }
  getBookingById(booking_id) {
    return this.apiService.get('/booking/booking', { booking_id });
  }
}
