import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss'],
})
export class CreateVehicleComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private vehicleservice: VehicleService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      vehicle_brand: [null, [Validators.required]],
      vehicle_name: [null, [Validators.required]],
      colour: [null],
      number: [
        null,
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
  }

  get vehicle() {
    return this.vehicleForm.controls;
  }

  createVehicle() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        console.log('working');
        this.notificationUtils.showMainLoading();
        this.vehicleservice
          .createVehicle({
            vehicle_brand: this.vehicle.vehicle_brand.value,
            vehicle_name: this.vehicle.vehicle_name.value,
            colour: this.vehicle.colour.value,
            number: this.vehicle.number.value,
          })
          .subscribe(
            () => {
              this.vehicleForm.reset();
              this.router.navigateByUrl('/vehicle/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Vehicle registered.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating vehicle : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
