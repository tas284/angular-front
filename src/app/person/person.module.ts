import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { PersonFormComponent } from './person-form/person-form.component';


@NgModule({
  declarations: [
    PersonComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }
