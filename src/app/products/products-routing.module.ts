import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';


const routes: Routes = [
  { path: '', redirectTo: 'view' },
  {
    path: 'create',
    component: CreateProductComponent,
  },
  {
    path: 'view',
    component: ViewProductsComponent,
  },
  {
    path: 'edit',
    component: EditProductComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
