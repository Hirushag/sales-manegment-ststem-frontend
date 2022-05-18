import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  userRoles = ['ADMIN', 'CUSTOMER'];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null],
      role: [null, [Validators.required]],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get user() {
    return this.userForm.controls;
  }

  createUser() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.authService
          .registerUser({
            name: this.user.name.value,
            username: this.user.username.value,
            email: this.user.email.value,
            password: this.user.password.value,
            role: this.user.role.value,
            contactNumber: this.user.contactNumber.value,
            isActive: 1,
          })
          .subscribe(
            () => {
              this.userForm.reset();
              this.router.navigateByUrl('/user/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('User registered.');
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
