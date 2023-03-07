import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly API: string = environment.FAKEAPI;

  constructor(private http: HttpClient) { }

  list(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.API}/todos`);
  }

}
