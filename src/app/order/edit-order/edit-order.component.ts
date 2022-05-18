import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  orderForm: FormGroup;
  id: String;
  products: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private vehicleService: OrderService,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
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
    this.loadVehicleData();
    console.log(this.id);
  }

  get order() {
    return this.orderForm.controls;
  }

  getAllProducts(){

    this.productService.getAllProdutcs().subscribe((data)=>{
      this.products = data

      console.log(this.products)
    })
  }
  updateOrder() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.vehicleService
          .editOrder(this.id, {
            userId: "6284046d1efc0233bc779e32",
            productPrice: this.order.productPrice.value,
            quantity: this.order.quantity.value,
            deliveryAddress: this.order.deliveryAddress.value,
            recipientName: this.order.recipientName.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/order/view');
              this.notificationUtils.showSuccessMessage('Order updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating order : ' + error.message
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
    this.vehicleService.getOrderById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.orderForm.patchValue({
          
          productPrice: data[0].productPrice,
          quantity: data[0].quantity,
          deliveryAddress: data[0].deliveryAddress,
          recipientName: data[0].recipientName,
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
