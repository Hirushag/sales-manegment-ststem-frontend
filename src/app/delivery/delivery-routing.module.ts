import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';
import { ViewDeliveryComponent } from './view-delivery/view-delivery.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'view' },
      {
        path: 'view',
        component: ViewDeliveryComponent,
      },
      {
        path: 'create',
        component: CreateDeliveryComponent,
      },
      {
        path: 'edit',
        component: EditDeliveryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
