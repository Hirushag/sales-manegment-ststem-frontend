import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  bookingForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private authservice: AuthService,
    private bookingservice: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      person: [null],
      date: [null],
      contact: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  get booking() {
    return this.bookingForm.controls;
  }

  createBooking() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.bookingservice
          .createBooking({
            firstName: this.booking.firstName.value,
            lastName: this.booking.lastName.value,
            contact: this.booking.contact.value,
            date: this.booking.date.value,
            person: this.booking.person.value,
            email: this.booking.email.value,
          })
          .subscribe(
            () => {
              this.bookingForm.reset();
              this.router.navigateByUrl('/booking/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Booking Succuss!');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating Booking : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
