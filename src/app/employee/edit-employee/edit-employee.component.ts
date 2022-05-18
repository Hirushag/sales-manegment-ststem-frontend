import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  id: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private employeeService: EmployeeService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

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
    this.loadEmployeeData();
    console.log(this.id);
  }

  get employee() {
    return this.employeeForm.controls;
  }

  updateEmployee() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.employeeService
          .editEmployee(this.id, {
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
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/employee/view');
              this.notificationUtils.showSuccessMessage('employee updated.');
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

  loadEmployeeData() {
    console.log(this.id);
    console.log('working');
    this.notificationUtils.showMainLoading();
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.notificationUtils.hideMainLoading();
        this.employeeForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          address1: data.address1,
          address2: data.address2,
          email: data.email,
          city: data.city,
          contact: data.contact,
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading employee : ' + error.message
        );
      }
    );
  }
}
