import { Component, OnInit } from '@angular/core';
import {Statistic} from '../core/models/statistic';
import {FishCatchHistoryService} from './fish-catch-history.service';
import {MatDialog} from '@angular/material/dialog';
import {FishCatchHistoryInsertDialogComponent} from './fish-catch-history-insert-dialog/fish-catch-history-insert-dialog.component';

@Component({
  selector: 'app-fish-catch-history',
  templateUrl: './fish-catch-history.component.html',
  styleUrls: ['./fish-catch-history.component.css']
})
export class FishCatchHistoryComponent implements OnInit {
  statistics: Statistic[];
  panelOpenState = false;

  constructor(private statisticService: FishCatchHistoryService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStatisticsByUserId();
  }

  getStatisticsByUserId(): void {
    this.statisticService.getStatisticByUserId(+localStorage.getItem('id')).subscribe(result => {
      this.statistics = result;
    });
  }

  getNameOfMonth(month: string): string {
    switch (month) {
      case '1': return 'Januar';
      case '2': return 'Februar';
      case '3': return 'März';
      case '4': return 'April';
      case '5': return 'Mai';
      case '6': return 'Juni';
      case '7': return 'Juli';
      case '8': return 'August';
      case '9': return 'September';
      case '10': return 'Oktober';
      case '11': return 'November';
      case '12': return 'Dezember';
    }
  }

  onAddStatistic(item: Statistic): void {
    this.dialog.open(FishCatchHistoryInsertDialogComponent, {
      width: '60%',
      height: 'auto',
      data: item
    });
  }
}
