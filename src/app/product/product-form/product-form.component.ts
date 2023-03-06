import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form!: FormGroup;
  title: string = 'Register new Product';
  name: string = '';
  msgSuccess!: string;
  msgError!: string;

  constructor(
    private service: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    const product = this.route.snapshot.data['product'];
    if (product.id !== '') {
      this.title = 'Edit';
      this.name = `${product.name}`;
    }

    this.form = this.formBuilder.group({
      id: [product.id],
      name: [product.name, Validators.required],
      price: [product.price],
      quantity: [product.quantity],
      brand: [product.brand],
      stockValue: [product.price * product.quantity]
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

      this.setMessage(this.form.value.id);

      this.service.save(this.form.value).subscribe(
        success => {
          console.log(this.msgSuccess);
          this.location.back()
        },
        error => {
          console.log(this.msgError);
          console.log(error);
          alert(JSON.stringify(error.error));
        },
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

  setMessage(id: string) {
    this.msgSuccess = 'Product created success!';
    this.msgError = 'Erro to created product!';
    if (id) {
      this.msgSuccess = 'Product updated success!';
      this.msgError = 'Erro to updated product!';
    }
  }
}
