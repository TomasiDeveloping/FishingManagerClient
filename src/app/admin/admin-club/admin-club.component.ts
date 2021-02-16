import {Component, OnInit} from '@angular/core';
import {Club} from '../../core/models/club';
import {ClubService} from '../../club/club.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-club',
  templateUrl: './admin-club.component.html',
  styleUrls: ['./admin-club.component.css']
})
export class AdminClubComponent implements OnInit {
  fishingClub: Club;
  clubForm: FormGroup;

  constructor(private clubService: ClubService) {
  }

  ngOnInit(): void {
    this.getFishingClub();
  }

  getFishingClub(): void {
    this.clubService.getFishingClub().subscribe(result => {
      this.fishingClub = result;
      this.initClubForm();
    });
  }

  initClubForm(): void {
    this.clubForm = new FormGroup({
      fishingClubId: new FormControl(this.fishingClub.fishingClubId),
      name: new FormControl(this.fishingClub.name, Validators.required),
      webSite: new FormControl(this.fishingClub.website),
      address: new FormGroup({
        title: new FormControl(this.fishingClub.address.title),
        phone: new FormControl(this.fishingClub.address.phone),
        street: new FormControl(this.fishingClub.address.street),
        addressAddition: new FormControl(this.fishingClub.address.addressAddition),
        zip: new FormControl(this.fishingClub.address.zip),
        city: new FormControl(this.fishingClub.address.city)
      }),
      fishSpecies: new FormArray([]),
      rules: new FormArray([])
    });

    if (this.fishingClub.fishSpecies.length > 0) {
      this.fishingClub.fishSpecies.forEach(fish => {
        this.fishSpecies.push(new FormGroup({
          fishSpecie: new FormControl(fish.fishSpecie),
          minimumSize: new FormControl(fish.minimumSize),
          closedSeasonStart: new FormControl(fish.closedSeasonStart),
          closedSeasonEnd: new FormControl(fish.closedSeasonEnd)
        }));
      });
    } else {
      this.fishSpecies.push(this.newFish());
    }

    if (this.fishingClub.rules.length > 0) {
      this.fishingClub.rules.forEach(rule => {
        this.rules.push(new FormGroup({
          rule: new FormControl(rule.rule)
        }));
      });
    } else {
      this.rules.push(this.newRule());
    }
  }

  get fishSpecies(): FormArray {
    return this.clubForm.get('fishSpecies') as FormArray;
  }

  get rules(): FormArray {
    return this.clubForm.get('rules') as FormArray;
  }

  newRule(): FormGroup {
    return new FormGroup({
      rule: new FormControl('')
    });
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
