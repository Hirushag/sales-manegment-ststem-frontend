import { BookingRoutingModule } from './booking-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookigComponent } from './edit-bookig/edit-bookig.component';
@NgModule({
  declarations: [CreateBookingComponent, ViewBookingComponent, EditBookigComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BookingModule {}
