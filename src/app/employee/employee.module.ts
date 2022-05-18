import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
@NgModule({
  declarations: [CreateEmployeeComponent, ViewEmployeeComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class EmployeeModule {}
