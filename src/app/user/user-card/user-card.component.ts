import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../core/models/user';
import {UserService} from '../user.service';
import {InfringementService} from '../../infringement/infringement.service';
import {Infringement} from '../../core/models/infringement';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {InsertInfringementDialogComponent} from '../../infringement/insert-infringement-dialog/insert-infringement-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnChanges {
  user: User;
  infringements: Infringement[];
  @Input() userId: number;

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private infringementService: InfringementService) {
  }

  ngOnInit(): void {
    if (this.userId < 0) {
      return;
    }
    this.getUserById(this.userId);
    this.getInfringementsByUserId(this.userId);
  }

  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(result => {
      this.user = result;
    });
  }

  getInfringementsByUserId(userId: number): void {
    this.infringementService.getInfringementsByUserId(userId).subscribe(result => {
      this.infringements = result;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getUserById(changes.userId.currentValue);
    this.getInfringementsByUserId(changes.userId.currentValue);
  }

  onAddInfringement(): void {
    const userId = this.userId;
    const creatorId = +localStorage.getItem('id');
    const dialogRef = this.dialog.open(InsertInfringementDialogComponent, {
      width: '60%',
      height: 'auto',
      data: {creatorId, userId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getInfringementsByUserId(userId);
    });
  }

  onLockUser(): void {
    Swal.fire({
      title: 'User sperren?',
      text: 'Soll ' + this.user.firstName + ' ' + this.user.lastName + ' wirklich gesperrt werden?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja sperren',
      cancelButtonText: 'Abbrechen'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.user.rightName === 'Administrator' || this.user.rightName === 'System-Admin') {
          Swal.fire('Admin User', 'Administrator können nicht gesperrt werden', 'info').then();
          return;
        }
        if (environment.isTestMode) {
          Swal.fire('Im Testmodus kann kein User gesperrt werden').then();
        } else {
          this.updateUser();
        }
      }
    });
  }

  private updateUser(): void {
    this.user.active = false;
    this.userService.updateUser(this.userId, this.user).subscribe(result => {
      if (result) {
        this.toastr.success(this.user.firstName + ' ' + this.user.lastName + ' erfolgreich gesperrt');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
