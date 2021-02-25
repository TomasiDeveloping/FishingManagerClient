import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClubService} from '../../../club/club.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rules',
  templateUrl: './edit-rules.component.html',
  styleUrls: ['./edit-rules.component.css']
})
export class EditRulesComponent implements OnInit {
  @Input() clubForm: FormGroup;
  istTestMode = environment.isTestMode;

  constructor(private clubService: ClubService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  get rules(): FormArray {
    return this.clubForm.get('rules') as FormArray;
  }

  onAddRule(): void {
    this.rules.push(this.newRule());
  }

  newRule(): FormGroup {
    return new FormGroup({
      rule: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.istTestMode) {
      Swal.fire('Test Modus', 'Im Testmodus kann nichts bearbeitet werden', 'info').then();
      return;
    }
    this.clubService.updateFishingClub(this.clubForm.controls.fishingClubId.value, this.clubForm.value).subscribe(result => {
      if (result) {
        this.toastr.success('Regeln erfolgreich geändert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }

  onRemoveRule(index: number): void {
    this.rules.removeAt(index);
  }
}
