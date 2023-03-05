import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private service: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadByID(id))
    //   )
    //   .subscribe(product => this.updateForm(product));

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id']
    //     const products$ = this.service.loadByID(id);
    //     products$.subscribe(product => {
    //       this.updateForm(product);
    //     });
    //   }
    // );

    const product = this.route.snapshot.data['product'];

    this.form = this.formBuilder.group({
      id: [product.id],
      name: [product.name, Validators.required],
      price: [product.price],
      quantity: [product.quantity],
      brand: [product.brand],
    });
  }

  updateForm(product: any) {
    this.form.setValue({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      brand: product.brand
    });
  }

  onSubmit() {
    if (this.form.valid) {
      debugger;

      let msgSuccess = 'Product created success!';
      let msgError = 'Erro to created product!';
      if(this.form.value.id){
        msgSuccess = 'Product updated success!';
        msgError = 'Erro to updated product!';
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
