import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';


@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private stockservice: SupplierService
  ) {this.id = this.route.snapshot.queryParamMap.get('id');
 }

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null],
      email: [null, [Validators.required]],
      category: [null],
    });

    this.loadStockData();
  }

  get supplier() {
    return this.supplierForm.controls;
  }

  updateSupplier() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.stockservice
          .editSupplier(this.id, {
            name: this.supplier.name.value,
            companyName: this.supplier.companyName.value,
            address: this.supplier.address.value,
            phone: this.supplier.phone.value,
            email: this.supplier.email.value,
            category: this.supplier.category.value,
          })
          .subscribe(
            () => {
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/supplier/view');
              this.notificationUtils.showSuccessMessage('Supplier updated.');
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
    this.stockservice.getStockById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.supplierForm.patchValue({
          name: data.name,
          companyName: data.companyName,
          address: data.address,
          phone: data.phone,
          email: data.email,
          category: data.category,
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
