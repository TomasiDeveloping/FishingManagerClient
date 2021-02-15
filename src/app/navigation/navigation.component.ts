import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {User} from '../core/models/user';
import {MatDialog} from '@angular/material/dialog';
import {UserUpdateDialogComponent} from '../user/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedInUser = false;
  currentUser: User;

  constructor(private userService: UserService,
              private dialog: MatDialog) { }

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

  onUpdate(): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '80%',
      height: 'auto',
      data: {user: this.currentUser, isAdmin: false}
    });
    dialogRef.afterClosed().subscribe(logout => {
      if (logout === true) {
        this.logout();
      }
      this.userService.currentUser$.subscribe(result => {
        this.currentUser = result;
      });
    });
  }
}
