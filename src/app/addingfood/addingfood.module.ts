import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAddingfoodComponent } from './create-addingfood/create-addingfood.component';
import { AddingfoodRoutingModule } from './addingfood-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ViewFoodComponent } from './view-food/view-food.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
@NgModule({
  declarations: [CreateAddingfoodComponent, ViewFoodComponent, EditFoodComponent],
  imports: [
    CommonModule,
    AddingfoodRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class AddingfoodModule {}
