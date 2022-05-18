import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {
  stockForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private authservice: AuthService,
    private stockservice: StockService
  ) { }

  ngOnInit(): void {
    this.stockForm = this.formBuilder.group({
      categoryType: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      inStock: [null, [Validators.required]],
      date: [null],
     
    });
  }

  get stock() {
    return this.stockForm.controls;
  }
  

  createStock() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.stockservice
          .createStock({
            categoryType: this.stock.categoryType.value,
            categoryName: this.stock.categoryName.value,
            inStock: this.stock.inStock.value,
            date: this.stock.date.value,
          })
          .subscribe(
            () => {
              this.stockForm.reset();
              this.router.navigateByUrl('/stock/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Stock Succuss!');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating Stock : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

}
