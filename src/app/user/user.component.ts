import {Component, OnInit} from '@angular/core';
import {User} from '../core/models/user';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser === null || this.currentUser.userId !== +localStorage.getItem('id')) {
      this.getCurrentUser(+localStorage.getItem('id'));
    }
  }

  getCurrentUser(userId: number): void {
    this.userService.getUserById(userId).subscribe(result => {
      this.currentUser = result;
    });
  }

}
