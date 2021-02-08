import { Component, OnInit } from '@angular/core';
import {ClubService} from './club.service';
import {Club} from '../core/models/club';
import {User} from '../core/models/user';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  fishingClub: Club;
  users: User[];

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
