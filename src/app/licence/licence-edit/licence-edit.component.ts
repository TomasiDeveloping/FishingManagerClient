import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Licence} from '../../core/models/licence';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user';
import {ClubService} from '../../club/club.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {deLocale} from 'ngx-bootstrap/locale';
import {LicenceService} from '../licence.service';
import {ToastrService} from 'ngx-toastr';

defineLocale('de', deLocale);


@Component({
  selector: 'app-licence-edit',
  templateUrl: './licence-edit.component.html',
  styleUrls: ['./licence-edit.component.css']
})
export class LicenceEditComponent implements OnInit {
  licence: Licence;
  licenceForm: FormGroup;
  users: User[] = [];
  locale = 'de';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<LicenceEditComponent>,
              private localeService: BsLocaleService,
              private toastr: ToastrService,
              private licenceService: LicenceService,
              private clubService: ClubService) {
    this.licence = data.licence;
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);
    this.initLicenceForm();
    this.getUsers();
  }

  getUsers(): void {
    this.clubService.getUsers().subscribe(result => {
      this.users = result;
    });
  }

  initLicenceForm(): void {
    this.licenceForm = new FormGroup({
      licenceId: new FormControl(this.licence.licenceId),
      licenceName: new FormControl(this.licence.licenceName, Validators.required),
      userId: new FormControl(this.licence.userId, Validators.required),
      creatorId: new FormControl(this.licence.creatorId),
      startDate: new FormControl(new Date(this.licence.startDate), Validators.required),
      endDate: new FormControl(new Date(this.licence.endDate), Validators.required),
      paid: new FormControl(this.licence.paid)
    });
  }

  onSubmit(): void {
    if (this.licence.licenceId <= 0) {
      this.insertLicence();
    } else {
      this.updateLicence();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private insertLicence(): void {
    this.licenceService.insertLicence(this.licenceForm.value).subscribe(result => {
      if (result) {
        this.onCancel();
        this.toastr.success('Lizenz ' + result.licenceName + ' erfolgreich hinzugefügt');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }

  private updateLicence(): void {
    this.licenceService.updateLicence(this.licence.licenceId, this.licenceForm.value).subscribe(result => {
      if (result) {
        this.onCancel();
        this.toastr.success('Lizenz erfolgreich geändert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
