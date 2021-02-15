import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../club/club.service';
import {Statistic} from '../../core/models/statistic';
import {MatDialog} from '@angular/material/dialog';
import {FishCatchHistoryDialogComponent} from '../../fishCatchHistory/fish-catch-history-dialog/fish-catch-history-dialog.component';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
  statistics: Statistic[];

  constructor(private clubService: ClubService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.clubService.getStatistics().subscribe(result => {
      this.statistics = result;
    });
  }

  onStatistic(licenceId: number): void {
    this.dialog.open(FishCatchHistoryDialogComponent, {
      width: '80%',
      height: 'auto',
      data: licenceId
    });
  }
}
