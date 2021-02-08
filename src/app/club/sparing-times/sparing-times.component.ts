import { Component, OnInit } from '@angular/core';
import {ClubService} from '../club.service';
import {Club} from '../../core/models/club';

@Component({
  selector: 'app-sparing-times',
  templateUrl: './sparing-times.component.html',
  styleUrls: ['./sparing-times.component.css']
})
export class SparingTimesComponent implements OnInit {
  fishingClub: Club;

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.getFishingClub();
  }

  private getFishingClub(): void {
    this.clubService.getFishingClub().subscribe(result => {
      this.fishingClub = result;
    });
  }
}
