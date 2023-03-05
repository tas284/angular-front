import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  
  title: string = "Register new Person";
  fullName: string = '';
  form!: FormGroup;

  constructor(
    private service: PersonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    const person = this.route.snapshot.data['person'];
    if(person.id !== ''){
      this.title = 'Edit';
      this.fullName = `${person.firstName}`
    }

    this.form = this.formBuilder.group({
      id: [person.id],
      firstName: [person.firstName, Validators.required],
      lastName: [person.lastName],
      phone: [person.phone],
    });
  }

  updateForm(person: any) {
    this.form.setValue({
      id: person.id,
      name: person.name,
      price: person.price,
      quantity: person.quantity,
      brand: person.brand
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let msgSuccess = 'Person created success!';
      let msgError = 'Erro to created person!';
      if(this.form.value.id){
        msgSuccess = 'Person updated success!';
        msgError = 'Erro to updated person!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          console.log(msgSuccess);
          this.location.back()
        },
        error => console.error(error),
      );
    }
  }

  onCancel() {
    console.log(this.form);
    this.form.reset();
  }

  goToProducts() {
    this.location.back();
  }

}

