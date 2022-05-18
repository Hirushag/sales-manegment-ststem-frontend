import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  ProductForm: FormGroup;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationUtilsService,
    private productService:ProductService
  ) {

    this.id = this.route.snapshot.queryParamMap.get('id');
   }

   

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

  loadUserData() {
    this.notificationUtils.showMainLoading();
    this.productService.getProducteById(this.id).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.ProductForm.patchValue({
          name: data[0].name,
          description: data[0].description,
          category: data[0].category,
          price: data[0].price,
          quantity: data[0].quantity,
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

  updateProduct() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.productService
          .editProduct(this.id, {
            name: this.product.name.value,
            description: this.product.description.value,
            category: this.product.category.value,
            price: this.product.price.value,
            quantity: this.product.quantity.value,
            isDeliveryAvailable: 1,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/products/view');
              this.notificationUtils.showSuccessMessage('Product updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating employee : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
