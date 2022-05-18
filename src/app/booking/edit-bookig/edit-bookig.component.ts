import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-bookig',
  templateUrl: './edit-bookig.component.html',
  styleUrls: ['./edit-bookig.component.scss'],
})
export class EditBookigComponent implements OnInit {
  bookingForm: FormGroup;
  booking_id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private bookingservice: BookingService
  ) {
    this.booking_id = this.route.snapshot.queryParamMap.get('booking_id');
  }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      person: [null],
      date: [null],
      contact: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.loadBookingData();
  }

  get booking() {
    return this.bookingForm.controls;
  }

  updateBooking() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.bookingservice
          .editBooking(this.booking_id, {
            firstName: this.booking.firstName.value,
            lastName: this.booking.lastName.value,
            contact: this.booking.contact.value,
            date: this.booking.date.value,
            person: this.booking.person.value,
            email: this.booking.email.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/booking/view');
              this.notificationUtils.showSuccessMessage('Booking updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating Booking : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadBookingData() {
    this.notificationUtils.showMainLoading();
    this.bookingservice.getBookingById(this.booking_id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.bookingForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          contact: data.contact,
          date: data.date,
          person: data.person,
          email: data.email,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading Bookig : ' + error.message
        );
      }
    );
  }
}
