import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './footer-contact.component.html',
  styleUrls: ['./footer-contact.component.css']
})
export class FooterContactComponent implements OnInit {
  contactForm: FormGroup;
  currentUser: User;

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(result => this.currentUser = result);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(this.currentUser ? this.currentUser.firstName + '' + this.currentUser.lastName : '', Validators.required),
      email: new FormControl(this.currentUser ? this.currentUser.email : '', [Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      message: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.contactForm.value);
  }
}
