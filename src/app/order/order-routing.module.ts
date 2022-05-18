import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'create',
          component: CreateOrderComponent,
        },
        {
          path: 'view',
          component: ViewOrderComponent,
        },
        {
          path: 'edit',
          component: EditOrderComponent,
        },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class OrderRoutingModule {}
  