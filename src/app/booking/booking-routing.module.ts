import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { EditBookigComponent } from './edit-bookig/edit-bookig.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'view' },
      {
        path: 'view',
        component: ViewBookingComponent,
      },
      {
        path: 'create',
        component: CreateBookingComponent,
      },
      {
        path: 'edit',
        component: EditBookigComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
