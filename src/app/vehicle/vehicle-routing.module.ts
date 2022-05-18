import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'create',
          component: CreateVehicleComponent,
        },
        {
          path: 'view',
          component: ViewVehicleComponent,
        },
        {
          path: 'edit',
          component: EditVehicleComponent,
        },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class VehicleRoutingModule {}
  