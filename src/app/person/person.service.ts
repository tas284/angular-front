import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly API: string = `${environment.API}Person`

  constructor(private http: HttpClient) {}

  list(){
    return this.http.get<Person[]>(this.API).pipe(
      delay(200)
    );
  }

  loadByID(id: string){
    return this.http.get<Person>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(product: Person){
    return this.http.post(this.API, product).pipe(take(1));;
  }

  private update(product: Person){
    return this.http.put(`${this.API}/${product.id}`, product, { responseType: 'text' }).pipe(take(1));
  }

  save(product: Person){
    if(product.id){
      return this.update(product);
    }
    return this.create(product);
  }

  delete(id: any){
    return this.http.delete(`${this.API}/${id}`, { responseType: 'text' }).pipe(take(1));
  }
}