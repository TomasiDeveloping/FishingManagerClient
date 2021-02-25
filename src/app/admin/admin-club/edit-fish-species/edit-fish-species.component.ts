import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClubService} from '../../../club/club.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fish-species',
  templateUrl: './edit-fish-species.component.html',
  styleUrls: ['./edit-fish-species.component.css']
})
export class EditFishSpeciesComponent implements OnInit {
  @Input() clubForm: FormGroup;
  isTestMode = environment.isTestMode;

  constructor(private clubService: ClubService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  get fishSpecies(): FormArray {
    return this.clubForm.get('fishSpecies') as FormArray;
  }

  onAddFish(): void {
    this.fishSpecies.push(this.newFish());
  }

  newFish(): FormGroup {
    return new FormGroup({
      fishSpecie: new FormControl('', Validators.required),
      minimumSize: new FormControl('', Validators.required),
      closedSeasonStart: new FormControl('', Validators.required),
      closedSeasonEnd: new FormControl('', Validators.required),
    });
  }

  onRemoveFish(index: number): void {
    this.fishSpecies.removeAt(index);
  }

  onSubmit(): void {
    if (this.isTestMode) {
      Swal.fire('Test Modus', 'Im Testmodus kann nichts bearbeitet werden', 'info').then();
      return;
    }
    this.clubService.updateFishingClub(this.clubForm.controls.fishingClubId.value, this.clubForm.value).subscribe(result => {
      if (result) {
        this.toastr.success('Fische und Schonzeit erfolgreich geändert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
