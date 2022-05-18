import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  ProductForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      category: [null, [Validators.required]],
      price: [null],
      quantity: [null],
     
    });
  }
  get product() {
    return this.ProductForm.controls;
  }

  
  createProducts() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.productService
          .createProduct({
            name: this.product.name.value,
            description: this.product.description.value,
            category: this.product.category.value,
            price: this.product.price.value,
            quantity: this.product.quantity.value,
            isDeliveryAvailable: 1,
          })
          .subscribe(
            () => {
              this.ProductForm.reset();
              this.router.navigateByUrl('/products/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Product Added !');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating user : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
  

}
