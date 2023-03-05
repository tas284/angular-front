import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonResolverGuard } from '../guard/person-resolver.guard';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonComponent } from './person.component';

const routes: Routes = [
  { path: '', component: PersonComponent },
  { path: 'new', component: PersonFormComponent, resolve: { product: PersonResolverGuard } },
  { path: 'edit/:id', component: PersonFormComponent, resolve: { product: PersonResolverGuard } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
