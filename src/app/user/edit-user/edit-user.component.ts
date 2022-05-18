import { Component, OnInit } from '@angular/core';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  userRoles = ['ADMIN', 'CUSTOMER'];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationUtilsService
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
  }

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
    this.loadUserData();
  }

  get user() {
    return this.userForm.controls;
  }

  updateUser() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
        this.authService
          .editUser(this.userId, {
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
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/user/view');
              this.notificationUtils.showSuccessMessage('User updated.');
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

  loadUserData() {
    this.notificationUtils.showMainLoading();
    this.authService.getUserById(this.userId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.userForm.patchValue({
          email: data[0].email,
          name: data[0].name,
          username: data[0].username,
          password: data[0].password,
          role: data[0].role,
          contactNumber: data[0].contactNumber,
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
}
