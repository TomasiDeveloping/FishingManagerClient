import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../core/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedInUser = false;
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const checkLogin = localStorage.getItem('id');
    if (checkLogin) {
      this.loggedInUser = true;
      this.getCurrentUser();
    }
  }

  logout(): void {
    this.userService.logout();
    this.loggedInUser = false;
  }

  loginUser(event: boolean): void {
    this.loggedInUser = event;
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getUserById(+localStorage.getItem('id')).subscribe(result => {
      this.currentUser = result;
    });
  }
}
