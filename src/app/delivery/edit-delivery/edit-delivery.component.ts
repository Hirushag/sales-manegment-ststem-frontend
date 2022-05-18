import { DeliveryService } from './../../services/delivery.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.scss'],
})
export class EditDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  id: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationUtils: NotificationUtilsService,
    private deliveryservise: DeliveryService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.id);
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
    this.loadItemData();
  }

  get delivery() {
    return this.deliveryForm.controls;
  }

  updateDelivery() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
        this.deliveryservise
          .editDelivery(this.id, {
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
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/delivery/view');
              this.notificationUtils.showSuccessMessage('delivery updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating delivery : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadItemData() {
    this.notificationUtils.showMainLoading();
    this.deliveryservise.getDeliveryById(this.id).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.deliveryForm.patchValue({
          rider_id: data.rider_id,
          name: data.name,
          email: data.email,
          delivery_date: data.delivery_date,
          address1: data.address1,
          address2: data.address2,
          contact: data.contact,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading work : ' + error.message
        );
      }
    );
  }
}
