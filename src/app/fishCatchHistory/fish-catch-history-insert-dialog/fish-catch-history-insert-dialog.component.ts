import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Days, FishCatch, Months, Statistic} from '../../core/models/statistic';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ClubService} from '../../club/club.service';
import {Club} from '../../core/models/club';
import {FishCatchHistoryService} from '../fish-catch-history.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-fish-catch-history-insert-dialog',
  templateUrl: './fish-catch-history-insert-dialog.component.html',
  styleUrls: ['./fish-catch-history-insert-dialog.component.css']
})
export class FishCatchHistoryInsertDialogComponent implements OnInit {
  statistic: Statistic;
  statisticForm: FormGroup;
  fishingClub: Club;
  fish: string[] = [];
  currentDate = new Date();
  currentStatisticDay: Days;
  currentCatch: FishCatch;
  currentMonth: Months;
  monthExists = false;
  dayExists = false;

  constructor(private fb: FormBuilder,
              private clubService: ClubService,
              private toastr: ToastrService,
              private fishCatchService: FishCatchHistoryService,
              private dialogRef: MatDialogRef<FishCatchHistoryInsertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.statistic = data;
  }

  ngOnInit(): void {
    this.getFishingClub();
  }

  initForm(): void{


    const currentDay = this.currentDate.getDate();
    const currentMonth = this.currentDate.getMonth() + 1;

    let checkDay = null;
    const checkMonth = this.statistic.statistic.months.filter(a => +a.month === currentMonth);
    if (checkMonth.length > 0) {
      this.monthExists = true;
      checkDay = checkMonth[0].days.filter(b => +b.day === currentDay);
      if (checkDay.length > 0) {
        this.dayExists = true;
      }
    }

    console.log('Monat: ' + checkMonth);
    console.log('Tag: ' + checkDay);

    this.statisticForm = new FormGroup({
      hour: new FormControl(this.dayExists ? checkDay[0].hour : ''),
      day: new FormControl(currentDay.toString()),
      month: new FormControl(this.monthExists ? checkMonth[0].month : currentMonth.toString()),
      fishs: new FormArray([]),
      other: new FormControl(''),
    });
    if (this.dayExists) {
      checkDay[0].fishCatches.forEach(a => {
        this.fishs.push(new FormGroup({
          fish: new FormControl(a.fish),
          number: new FormControl(a.number)
        }));
      });
    } else {
      this.addFish();
    }

  }

  get fishs(): FormArray {
    return this.statisticForm.get('fishs') as FormArray;
  }

  addFish(): void {
    this.fishs.push(this.newFish());
  }
  newFish(): FormGroup {
    return new FormGroup({
      fish: new FormControl(''),
      number: new FormControl('')
    });
  }
  getFishingClub(): void {
    this.clubService.getFishingClub().subscribe(result => {
      this.fishingClub = result;
      result.fishSpecies.FishArten.Fisch.forEach(a => {
        this.fish.push(a.Name);
      });
      this.initForm();
    });
  }

  onSubmit(): void {
    console.log(this.statisticForm.value);
    // tslint:disable-next-line:new-parens
    this.currentStatisticDay = new class implements Days {
      day: string;
      fishCatches: FishCatch[] = [];
      hour: string;
    };
    // tslint:disable-next-line:new-parens
    this.currentCatch = new class implements FishCatch {
      fish: string;
      number: string;
    };
    // tslint:disable-next-line:new-parens
    this.currentMonth = new class implements Months {
      days: Days[] = [];
      month: string;
    };
    this.currentStatisticDay.hour = this.statisticForm.controls.hour.value;
    this.currentStatisticDay.day = this.statisticForm.controls.day.value;
    this.currentStatisticDay.fishCatches = this.statisticForm.controls.fishs.value;
    this.currentMonth.month = this.statisticForm.controls.month.value;
    this.currentMonth.days.push(this.currentStatisticDay);
    if (this.monthExists) {
      this.statistic.statistic.months = [];
      this.statistic.statistic.months.push(this.currentMonth);
    } else {
      this.statistic.statistic.months.push(this.currentMonth);
    }

    console.log(this.statistic);
    this.fishCatchService.updateStatistic(this.statistic.id, this.statistic).subscribe(result => {
      if (result) {
        this.toastr.success('Statistik erfolgreich');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
