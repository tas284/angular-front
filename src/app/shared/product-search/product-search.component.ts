import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {

  products$!: Observable<Product[]>;
  private searchText$ = new Subject<string>();
  
  constructor(private service: ProductService){}
  
  ngOnInit(): void {
    this.products$ = this.searchText$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(name =>
        this.service.search(name))
    )
  }

  search(productName: string){
    this.searchText$.next(productName);
  }
  
  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value;
  }
}
