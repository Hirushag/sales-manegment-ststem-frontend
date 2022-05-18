import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplierr-routing.module';
import {  CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateSupplierComponent, EditSupplierComponent, ViewSupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class SupplierModule { }
