import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverGuard } from '../guard/product-resolver.guard';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'new', component: ProductFormComponent, resolve: { product: ProductResolverGuard } },
  { path: 'edit/:id', component: ProductFormComponent, resolve: { product: ProductResolverGuard } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
