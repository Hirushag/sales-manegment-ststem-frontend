import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private vehicleService: VehicleService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

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
    this.loadVehicleData();
    console.log(this.id);
  }

  get vehicle() {
    return this.vehicleForm.controls;
  }

  updateVehicle() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.vehicleService
          .editVehicle(this.id, {
            vehicle_brand: this.vehicle.vehicle_brand.value,
            vehicle_name: this.vehicle.vehicle_name.value,
            colour: this.vehicle.colour.value,
            number: this.vehicle.number.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/vehicle/view');
              this.notificationUtils.showSuccessMessage('vehicle updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating vehicle : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadVehicleData() {
    console.log(this.id);
    console.log('working');
    this.notificationUtils.showMainLoading();
    this.vehicleService.getVehicleById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.vehicleForm.patchValue({
          vehicle_brand: data.vehicle_brand,
          vehicle_name: data.vehicle_name,
          colour: data.colour,
          number: data.number,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading vehicle : ' + error.message
        );
      }
    );
  }
}
