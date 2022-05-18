import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { ViewStockComponent } from './view-stock/view-stock.component';


const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'view' },
        {
          path: 'view',
          component: ViewStockComponent,
        },
        {
          path: 'create',
          component: CreateStockComponent,
        },
        {
        
          path: 'edit',
          component: EditStockComponent,
        },
      ],
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class StockRoutingModule {}