import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private employeeservice: EmployeeService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address1: [null],
      address2: [null],
      email: [null, [Validators.required, Validators.email]],
      city: [null],
      contact: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get employee() {
    return this.employeeForm.controls;
  }

  createEmployee() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.employeeservice
          .createEmployee({
            first_name: this.employee.first_name.value,
            last_name: this.employee.last_name.value,
            address1: this.employee.address1.value,
            address2: this.employee.address2.value,
            email: this.employee.email.value,
            city: this.employee.city.value,
            contact: this.employee.contact.value,
          })
          .subscribe(
            () => {
              this.employeeForm.reset();
              this.router.navigateByUrl('/employee/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('Employee registered.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating employee : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
