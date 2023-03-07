import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'search', pathMatch:'full' },
  { path: 'product', loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)},
  { path: 'person', loadChildren: () => import('./person/person.module').then(mod => mod.PersonModule)},
  { path: 'order', loadChildren: () => import('./order/order.module').then(mod => mod.OrderModule)},
  { path: 'search', loadChildren: () => import('./shared/shared.module').then(mod => mod.SharedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
