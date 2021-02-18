import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppUser} from '../core/models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appUser: AppUser;
  loginForm: FormGroup;
  @Output() login: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,
              private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.userService.login(this.loginForm.value).subscribe(result => {
      if (result) {
        this.login.emit(true);
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
