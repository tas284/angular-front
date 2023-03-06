import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {

  @Output() filter = new EventEmitter<string>();

  filterItem(value: string) {
    this.filter.emit(value);
  }
}
