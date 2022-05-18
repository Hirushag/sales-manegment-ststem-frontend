import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';


@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {
  stockForm: FormGroup;
  stock_id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private stockservice: StockService
  ) {this.stock_id = this.route.snapshot.queryParamMap.get('stock_id');
 }

  ngOnInit(): void {
    this.stockForm = this.formBuilder.group({
      categoryType: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      inStock: [null, [Validators.required]],
      useStock: [null, [Validators.required]],
      wasteStock: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });

    this.loadStockData();
  }

  get stock() {
    return this.stockForm.controls;
  }

  updateStock() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.stockservice
          .editStock(this.stock_id, {
            categoryType: this.stock.categoryType.value,
            categoryName: this.stock.categoryName.value,
            inStock: this.stock.inStock.value,
            useStock: this.stock.useStock.value,
            wasteStock: this.stock.wasteStock.value,
            date: this.stock.date.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/stock/view');
              this.notificationUtils.showSuccessMessage('Stock updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating Stock : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadStockData() {
    this.notificationUtils.showMainLoading();
    this.stockservice.getStockById(this.stock_id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.stockForm.patchValue({
          categoryType: data.categoryType,
          categoryName: data.categoryName,
          inStock: data.inStock,
          useStock: data.useStock,
          wasteStock: data.wasteStock,
          date: data.date,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading Stock : ' + error.message
        );
      }
    );
  }
}
