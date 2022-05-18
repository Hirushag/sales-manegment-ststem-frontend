import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { ViewStockComponent } from './view-stock/view-stock.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateStockComponent, EditStockComponent, ViewStockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class StockModule { }
