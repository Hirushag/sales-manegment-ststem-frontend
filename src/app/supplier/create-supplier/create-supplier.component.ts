import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private authservice: AuthService,
    private stockservice: SupplierService
  ) { }

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null],
      email: [null, [Validators.required]],
      category: [null],
     
    });
  }

  get supplier() {
    return this.supplierForm.controls;
  }
  

  createSupplier() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.stockservice
          .createSupplier({
            name: this.supplier.name.value,
            companyName: this.supplier.companyName.value,
            address: this.supplier.address.value,
            phone: this.supplier.phone.value,
            email: this.supplier.email.value,
            category: this.supplier.category.value,
          })
          .subscribe(
            () => {
              this.supplierForm.reset();
              this.router.navigateByUrl('/supplier/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Supplier Added Succuss!');
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
