import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Days} from '../../core/models/statistic';

@Component({
  selector: 'app-current-day-statistic-dialog',
  templateUrl: './current-day-statistic-dialog.component.html',
  styleUrls: ['./current-day-statistic-dialog.component.css']
})
export class CurrentDayStatisticDialogComponent implements OnInit {
  currentDay: Days;

  constructor(private dialogRef: MatDialogRef<CurrentDayStatisticDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentDay = data;
  }

  ngOnInit(): void {
  }

}
