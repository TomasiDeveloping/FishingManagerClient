import { Component, OnInit } from '@angular/core';
import {Club} from '../../core/models/club';
import {ClubService} from '../club.service';

@Component({
  selector: 'app-club-rules',
  templateUrl: './club-rules.component.html',
  styleUrls: ['./club-rules.component.css']
})
export class ClubRulesComponent implements OnInit {
  fishingClub: Club;
  panelOpenState = false;

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.getFishingClub();
  }

  getFishingClub(): void {
    this.clubService.getFishingClub().subscribe(result => {
      this.fishingClub = result;
    });
  }
}
