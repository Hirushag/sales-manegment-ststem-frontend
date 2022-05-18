import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAddingfoodComponent } from './create-addingfood/create-addingfood.component';
import { ViewFoodComponent } from './view-food/view-food.component';
import { EditFoodComponent } from './edit-food/edit-food.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'view' },
      {
        path: 'create',
        component: CreateAddingfoodComponent,
      },
      {
        path: 'view',
        component: ViewFoodComponent,
      },
      {
        path: 'edit',
        component: EditFoodComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingfoodRoutingModule {}
