import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-fish-species',
  templateUrl: './edit-fish-species.component.html',
  styleUrls: ['./edit-fish-species.component.css']
})
export class EditFishSpeciesComponent implements OnInit {
  @Input() clubForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  get fishSpecies(): FormArray {
    return this.clubForm.get('fishSpecies') as FormArray;
  }

  onSubmit(): void {
    console.log(this.clubForm.value);
  }

  onAddFish(): void {
    this.fishSpecies.push(this.newFish());
  }

  newFish(): FormGroup {
    return new FormGroup({
      fishSpecie: new FormControl(''),
      minimumSize: new FormControl(''),
      closedSeasonStart: new FormControl(''),
      closedSeasonEnd: new FormControl(''),
    });
  }

}
