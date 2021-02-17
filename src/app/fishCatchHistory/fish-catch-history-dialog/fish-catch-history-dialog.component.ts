import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FishCatchHistoryService} from '../fish-catch-history.service';
import {Statistic} from '../../core/models/statistic';
import {ToastrService} from 'ngx-toastr';
import {CurrentDayStatisticDialogComponent} from '../../supervisor/current-day-statistic-dialog/current-day-statistic-dialog.component';

@Component({
  selector: 'app-fish-catch-history-dialog',
  templateUrl: './fish-catch-history-dialog.component.html',
  styleUrls: ['./fish-catch-history-dialog.component.css']
})
export class FishCatchHistoryDialogComponent implements OnInit {
  licenceId: number;
  statistic: Statistic;
  panelOpenState = false;
  currentDate = new Date();

  constructor(private fishCatchHistoryService: FishCatchHistoryService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<FishCatchHistoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.licenceId = data;
  }

  ngOnInit(): void {
    this.getStatisticById(this.licenceId);
  }

  getStatisticById(licenceId: number): void {
    this.fishCatchHistoryService.getStatisticByLicenceId(licenceId).subscribe(result => {
      this.statistic = result;
    }, error => {
      this.toastr.error(error.error);
      this.dialogRef.close();
    });
  }

  onCurrentDay(): void {
    const currentMonth = this.currentDate.getMonth() + 1;
    const currentDay = this.currentDate.getDate();
    let currentStatisticDay = [];
    const currentStatistic = this.statistic.statistic.months.filter(a => a.month === currentMonth.toString());
    if (currentStatistic.length > 0) {
      currentStatisticDay = currentStatistic[0].days.filter(b => b.day === currentDay.toString());
    }
    if (currentStatisticDay.length <= 0) {
      this.toastr.warning('Kein Eintrag für den aktuellen Tag');
      return;
    }
    this.dialog.open(CurrentDayStatisticDialogComponent, {
      width: '60%',
      height: 'auto',
      data: currentStatisticDay[0]
    });
  }
}
