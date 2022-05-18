import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddingfoodService } from 'src/app/services/addingfood.service';

@Component({
  selector: 'app-create-addingfood',
  templateUrl: './create-addingfood.component.html',
  styleUrls: ['./create-addingfood.component.scss'],
})
export class CreateAddingfoodComponent implements OnInit {
  addingfoodForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private addingfoodservice: AddingfoodService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.addingfoodForm = this.formBuilder.group({
      food_name: [null, [Validators.required]],
      food_price: [null, [Validators.required]],
      food_quantity: [null, [Validators.required]],
    });
  }

  get addingfood() {
    return this.addingfoodForm.controls;
  }

  createAddingfood() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.addingfoodservice
          .createAddingfood({
            food_name: this.addingfood.food_name.value,
            food_price: this.addingfood.food_price.value,
            food_quantity: this.addingfood.food_quantity.value,
          })
          .subscribe(
            () => {
              this.addingfoodForm.reset();
              this.router.navigateByUrl('/addingfood/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('food added.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating addingfood : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
