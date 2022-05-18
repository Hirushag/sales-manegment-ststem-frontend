import { DeliveryService } from './../../services/delivery.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private deliveryservice: DeliveryService
  ) {}

  ngOnInit(): void {
    this.deliveryForm = this.formBuilder.group({
      rider_id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address1: [null, [Validators.required]],
      address2: [null, [Validators.required]],
      delivery_date: [null],
      contact: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get delivery() {
    return this.deliveryForm.controls;
  }

  createDelivery() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.deliveryservice
          .registerDelivery({
            rider_id: this.delivery.rider_id.value,
            name: this.delivery.name.value,
            email: this.delivery.email.value,
            delivery_date: this.delivery.delivery_date.value,
            address1: this.delivery.address1.value,
            address2: this.delivery.address2.value,
            contact: this.delivery.contact.value,
          })
          .subscribe(
            () => {
              this.deliveryForm.reset();
              this.router.navigateByUrl('/delivery/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Delivery registered.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating Delivery : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
