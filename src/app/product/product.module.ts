import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductSearchComponent } from './product-search/product-search.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent,
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProductModule { }
