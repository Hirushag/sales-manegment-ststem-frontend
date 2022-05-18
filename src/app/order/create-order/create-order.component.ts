import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  products: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private vehicleservice: OrderService,
    private authservice: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      product: [null, [Validators.required]],
      productPrice: [null, [Validators.required]],
      quantity: [null],
      deliveryAddress: [
        null,
        [Validators.required],
      ],
      recipientName: [
        null,
        [Validators.required],
      ],
    });
    this.getAllProducts();
  }

  get order() {
    return this.orderForm.controls;
  }

  createOrder() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        console.log('working');
        console.log(this.order.product.value)
        this.notificationUtils.showMainLoading();
        this.vehicleservice
          .createOrder({
          
            productId: this.order.product.value,
            userId: "6284046d1efc0233bc779e32",
            productPrice: this.order.productPrice.value,
            quantity: this.order.quantity.value,
            deliveryAddress: this.order.deliveryAddress.value,
            recipientName: this.order.recipientName.value,
          })
          .subscribe(
            () => {
              this.orderForm.reset();
              this.router.navigateByUrl('/order/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Order Created.');
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

  getAllProducts(){

    this.productService.getAllProdutcs().subscribe((data)=>{
      this.products = data

      console.log(this.products)
    })
  }
}
