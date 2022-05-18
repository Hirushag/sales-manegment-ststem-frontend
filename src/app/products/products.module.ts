import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { StockRoutingModule } from '../stock/stock-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [CreateProductComponent, ViewProductsComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StockRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductsModule { }
