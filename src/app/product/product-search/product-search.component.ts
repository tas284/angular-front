import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap, tap } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {

  @Output() productsEvent = new EventEmitter<Observable<Product[]>>();
  private searchText$ = new Subject<string>();
  
  constructor(private service: ProductService){}
  
  ngOnInit(): void {
    console.log("ngOnInit");
    let observableProducts = this.searchText$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(name => this.service.search(name)));
    
    this.updateProducts(observableProducts);
  }

  updateProducts(observableProducts: Observable<Product[]>){
    this.productsEvent.emit(observableProducts);
  }

  search(name: string){
    this.searchText$.next(name);
  }
  
  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value;
  }
}
