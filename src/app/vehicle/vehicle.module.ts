import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';

@NgModule({
  declarations: [
    CreateVehicleComponent,
    ViewVehicleComponent,
    EditVehicleComponent,
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class VehicleModule {}
