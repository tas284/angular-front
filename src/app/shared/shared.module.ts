import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductService } from '../product/product.service';

@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductSearchComponent
  ]
})
export class SharedModule { }
