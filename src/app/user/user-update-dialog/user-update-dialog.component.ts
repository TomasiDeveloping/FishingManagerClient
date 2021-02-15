import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChangePassword, User} from '../../core/models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {
  currentUser: User;
  userForm: FormGroup;
  newPassword: string;
  changePassword: ChangePassword;
  changeAddress = false;
  isAdmin = false;
  isTestMode = environment.isTestMode;

  constructor(private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
              private userService: UserService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = data.user;
    this.isAdmin = data.isAdmin;
  }

  ngOnInit(): void {
    // tslint:disable-next-line:new-parens
    this.changePassword = new class implements ChangePassword {
      password: string;
      userId: number;
    };
    if (this.isAdmin) {
      this.changeAddress = true;
    }
    this.initUserForm();
  }

  initUserForm(): void {
    this.userForm = new FormGroup({
      userId: new FormControl(this.currentUser.userId),
      rightId: new FormControl(this.currentUser.rightId),
      active: new FormControl(this.currentUser.active),
      pictureUrl: new FormControl(this.currentUser.PictureUrl),
      firstName: new FormControl(this.currentUser.firstName, Validators.required),
      lastName: new FormControl(this.currentUser.lastName, Validators.required),
      email: new FormControl(this.currentUser.email, Validators.required),
      address: new FormGroup({
        id: new FormControl(this.currentUser.address.id),
        title: new FormControl(this.currentUser.address.title),
        phone: new FormControl(this.currentUser.address.phone, Validators.required),
        street: new FormControl(this.currentUser.address.street, Validators.required),
        addressAddition: new FormControl(this.currentUser.address.addressAddition),
        zip: new FormControl(this.currentUser.address.zip, Validators.required),
        city: new FormControl(this.currentUser.address.city, Validators.required)
      }),
    });
  }

  onSubmit(): void {
    this.onCancel(false);
    if (this.currentUser.userId <= 0) {
      this.insertUser();
    } else {
      this.userService.updateUser(this.currentUser.userId, this.userForm.value).subscribe(result => {
        if (result) {
          this.userService.setCurrentUser(result);
          this.toastr.success('Erfolgreich geändert');
        }
      }, error => {
        this.toastr.error(error.error);
      });
    }
  }

  onChangePassword(): void {
    Swal.mixin({
      input: 'password',
      confirmButtonText: 'Weiter &rarr;',
      showCancelButton: true,
      cancelButtonText: 'Abbrechen',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Neues Passwort',
        preConfirm: inputValue => {
          this.newPassword = inputValue;
        }
      },
      {
        title: 'Passwort wiederholen',
        preConfirm: inputValue => {
          if (inputValue !== this.newPassword) {
            Swal.showValidationMessage('Passwort nicht identisch');
          }
        }
      }
    ]).then((result: SweetAlertResult) => {
      if (!result.dismiss) {
        this.changePassword.userId = this.currentUser.userId;
        this.changePassword.password = this.newPassword;
        if (environment.isTestMode) {
          Swal.fire('Neues Passwort',
            'Im Testmodus kann das Passwort nicht geändert werden',
            'info').then(() => this.onCancel(false));
        } else {
          this.userService.changeUserPassword(this.changePassword).subscribe(response => {
            if (response) {
              Swal.fire('Neuse Passwort',
                'Passwort erfolgreich geändert. Sie werden automatisch ausgelogt',
                'success')
                .then(() => this.onCancel(true));
            }
          }, error => {
            Swal.fire('Neuse Passwort', error.error, 'error').then();
          });
        }
      }
    });
  }

  onCancel(logout: boolean): void {
    this.dialogRef.close(logout);
  }

  private insertUser(): void {
    console.log(this.userForm.value);
    // TODO Insert new User
  }
}
