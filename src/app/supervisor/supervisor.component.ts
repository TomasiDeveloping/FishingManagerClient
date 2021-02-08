import {Component, OnInit} from '@angular/core';
import {ClubService} from '../club/club.service';
import {User} from '../core/models/user';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  users: User[];
  userId: number;
  // tslint:disable-next-line:new-parens
  myControl = new FormControl;
  filteredOptions: Observable<User[]>;

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.getUsers();

  }
  initAutoComplete(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.users.slice())
      );
  }

  getUsers(): void {
    this.clubService.getUsers().subscribe(result => {
      this.users = result;
      this.initAutoComplete();
    });
  }



  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(option => option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  displayFn(user: User): string {
    return user ? user.firstName + ' ' + user.lastName  : '';
  }

  onSelectChange(event: MatAutocompleteSelectedEvent): void {
    this.userId = event.option.value.userId;
  }
}
