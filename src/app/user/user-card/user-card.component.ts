import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../core/models/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnChanges {
  user: User;
  @Input() userId: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.userId < 0) {
      return;
    }
    this.getUserById(this.userId);
  }

  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(result => {
      this.user = result;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUserById(changes.userId.currentValue);
    }
}
