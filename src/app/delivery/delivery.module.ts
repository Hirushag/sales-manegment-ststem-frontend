import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { ViewDeliveryComponent } from './view-delivery/view-delivery.component';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';

@NgModule({
  declarations: [
    ViewDeliveryComponent,

    CreateDeliveryComponent,

    EditDeliveryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    DeliveryRoutingModule,
  ],
})
export class DeliveryModule {}
