import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddingfoodService } from 'src/app/services/addingfood.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})
export class EditFoodComponent implements OnInit {
  addingfoodForm: FormGroup;
  food_id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private addingfoodService: AddingfoodService
  ) {
    this.food_id = this.route.snapshot.queryParamMap.get('food_id');
  }

  ngOnInit(): void {
    this.addingfoodForm = this.formBuilder.group({
      food_name: [null, [Validators.required]],
      food_price: [null, [Validators.required]],
      food_quantity: [null, [Validators.required]],
    });
    this.loadFoodData();
    console.log(this.food_id);
  }

  get addingfood() {
    return this.addingfoodForm.controls;
  }

  updateFood() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.addingfoodService
          .editFood(this.food_id, {
            food_name: this.addingfood.food_name.value,
            food_price: this.addingfood.food_price.value,
            food_quantity: this.addingfood.food_quantity.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/addingfood/view');
              this.notificationUtils.showSuccessMessage('food updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating Food : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadFoodData() {
    this.notificationUtils.showMainLoading();
    this.addingfoodService.getFoodById(this.food_id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.addingfoodForm.patchValue({
          food_name: data.food_name,
          food_price: data.food_price,
          food_quantity: data.food_quantity,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading addingfood : ' + error.message
        );
      }
    );
  }
}
