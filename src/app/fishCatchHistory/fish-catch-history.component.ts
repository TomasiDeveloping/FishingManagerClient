import { Component, OnInit } from '@angular/core';
import {Statistic} from '../core/models/statistic';
import {FishCatchHistoryService} from './fish-catch-history.service';

@Component({
  selector: 'app-fish-catch-history',
  templateUrl: './fish-catch-history.component.html',
  styleUrls: ['./fish-catch-history.component.css']
})
export class FishCatchHistoryComponent implements OnInit {
  statistics: Statistic[];
  panelOpenState = false;

  constructor(private statisticService: FishCatchHistoryService) { }

  ngOnInit(): void {
    this.getStatisticsByUserId();
  }

  getStatisticsByUserId(): void {
    this.statisticService.getStatisticByUserId(+localStorage.getItem('id')).subscribe(result => {
      this.statistics = result;
      console.log(this.statistics);
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

}
