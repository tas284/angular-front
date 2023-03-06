import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { environment } from 'src/environment/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API: string = `${environment.API}Product`

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Product[]>(`${this.API}/all`).pipe(
      // delay(200)
    );
  }

  loadByID(id: string){
    return this.http.get<Product>(`${this.API}/${id}`).pipe(take(1));
  }

  search(name: string, withRefresh: boolean = false): Observable<Product[]>{
    if(name == null || name == '' || name == undefined){
      return this.list(); 
    }
    return this.http.get<Product[]>(`${this.API}/all/${name}`);
  }

  private create(product: Product){
    return this.http.post(this.API, product).pipe(take(1));;
  }

  private update(product: Product){
    return this.http.put(`${this.API}/${product.id}`, product, { responseType: 'text' }).pipe(take(1));
  }

  save(product: Product){
    if(product.id){
      return this.update(product);
    }
    return this.create(product);
  }

  delete(id: any){
    return this.http.delete(`${this.API}/${id}`, { responseType: 'text' }).pipe(take(1));
  }
}
