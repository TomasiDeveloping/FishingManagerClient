import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../../user/user.service';
import {CoreService} from '../../services/core.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-footer-contact',
  templateUrl: './footer-contact.component.html',
  styleUrls: ['./footer-contact.component.css']
})
export class FooterContactComponent implements OnInit {
  contactForm: FormGroup;
  currentUser: User;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<FooterContactComponent>,
              private coreService: CoreService) {
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
    this.coreService.sendContactMail(this.contactForm.value).subscribe(response => {
      this.dialogRef.close();
      if (response) {
        this.toastr.success('Besten Dank für deine Nachricht, wir melden uns schnellstmöglich', 'Kontakt');
      } else {
        this.toastr.warning('Deine Nachricht konnte nicht gesendet werden');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
