import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateEmployeeComponent,
      },
      {
        path: 'view',
        component: ViewEmployeeComponent,
      },
      {
        path: 'edit',
        component: EditEmployeeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
