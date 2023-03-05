import { Component } from '@angular/core';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  people$!: Observable<Person[]>;
  error$!: Subject<boolean>;

  constructor(private service: PersonService) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void {
    this.showPeople();
    this.people$ = this.service.list().pipe(
      catchError(error => {
        console.log(error);
        this.error$.next(false);
        return empty();
      })
    );
  }

  showPeople(){
    this.service.list().subscribe(
      value => console.log(value),
      error => console.log(error)
    )
  }

  onDelete(person: Person){
    debugger;
    this.service.delete(person.id).subscribe(
      success => {
        console.log(success);
        this.onRefresh();
      },
      error => console.log(error),
      () => console.log("Delete completed.")
    );
  }

}
