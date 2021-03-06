import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isTestMode = environment.isTestMode;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
    });
  }

  onForgotPassword(): void {
    if (this.isTestMode) {
      Swal.fire('Test Modus', 'Im Testmodus kann kein neues Password angefordert werden', 'info').then(() => this.dialogRef.close());
      return;
    }
    this.userService.forgotPassword(this.forgotPasswordForm.controls.email.value).subscribe(response => {
      if (response) {
        this.dialogRef.close();
        this.toastr.success('Neues Passwort wird per E-Mail gesendet');
      } else {
        this.toastr.warning('E-Mail existiert nicht auf der Plattform');
      }
    }, error => {
      this.dialogRef.close();
      this.toastr.error(error.error);
    });
  }
}
