import { Component, OnInit } from '@angular/core';
import { filter, flatMap, map, Observable, tap } from 'rxjs';
import { SearchService } from './search.service';
import { Todo } from './todo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  todos!: Todo[];

  constructor(private service: SearchService) { }

  ngOnInit(): void {
    this.service.list().pipe(
      map(value => {
        this.todos = value.filter(item => item.id < 10)
      })
    ).subscribe();
  }
}