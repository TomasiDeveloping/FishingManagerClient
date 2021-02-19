import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InfringementService} from '../infringement.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-infringement-dialog',
  templateUrl: './insert-infringement-dialog.component.html',
  styleUrls: ['./insert-infringement-dialog.component.css']
})
export class InsertInfringementDialogComponent implements OnInit {
  creatorId: number;
  userId: number;
  infringementForm: FormGroup;

  constructor(private infringementService: InfringementService,
              private dialogRef: MatDialogRef<InsertInfringementDialogComponent>,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.creatorId = data.creatorId;
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.createInfringementForm();
  }

  createInfringementForm(): void {
    this.infringementForm = new FormGroup({
      description: new FormControl('', Validators.required),
      userName: new FormControl(''),
      userId: new FormControl(this.userId),
      creatorName: new FormControl(''),
      creatorId: new FormControl(this.creatorId),
      createdAt: new FormControl(new Date())
    });
  }

  onSubmit(): void {
    if (environment.isTestMode) {
      Swal.fire('Im Testmodus kann kein Verstoss hinzugefügt werden').then();
      return;
    }
    this.infringementService.insertInfringement(this.infringementForm.value).subscribe(result => {
      if (result) {
        this.toastr.success('Verstoss gespeichert');
        this.dialogRef.close();
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
