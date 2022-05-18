import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'employee',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'delivery',
        loadChildren: () =>
          import('./delivery/delivery.module').then((m) => m.DeliveryModule),
      },
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./vehicle/vehicle.module').then((m) => m.VehicleModule),
      },

      {
        path: 'addingfood',
        loadChildren: () =>
          import('./addingfood/addingfood.module').then(
            (m) => m.AddingfoodModule
          ),
      },
      {
        path: 'stock',
        loadChildren: () =>
          import('./stock/stock.module').then((m) => m.StockModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
