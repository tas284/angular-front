import { Component, OnInit } from '@angular/core';
import { catchError, empty, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products$!: Observable<Product[]>;
  error$!: Subject<boolean>;

  constructor(
    private service: ProductService,
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.products$ = this.service.list().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

  onDelete(product: Product){
    this.service.delete(product.id).subscribe(
      success => {
        console.log(success);
        this.onRefresh();
      },
      error => console.log(error),
      () => console.log("Delete completed.")
    );
  }

}
