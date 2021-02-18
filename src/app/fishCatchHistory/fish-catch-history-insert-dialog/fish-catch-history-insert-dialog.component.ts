import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Days, FishCatch, Months, Statistic} from '../../core/models/statistic';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  day: number;
  month: number;
  hours: string[] = [];
  minutes: string[] = [];

  constructor(private fb: FormBuilder,
              private clubService: ClubService,
              private toastr: ToastrService,
              private fishCatchService: FishCatchHistoryService,
              private dialogRef: MatDialogRef<FishCatchHistoryInsertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.statistic = data;
  }

  get fishSpecies(): FormArray {
    return this.statisticForm.get('fishSpecies') as FormArray;
  }

  private static createMonth(): Months {
    // tslint:disable-next-line:new-parens
    return new class implements Months {
      days: Days[] = [];
      month: string;
    };
  }

  private static createFishCatch(): FishCatch {
    // tslint:disable-next-line:new-parens
    return new class implements FishCatch {
      fish: string;
      number: string;
    };
  }

  private static createDay(): Days {
    // tslint:disable-next-line:new-parens
    return new class implements Days {
      day: string;
      fishCatches: FishCatch[] = [];
      hour: string;
    };
  }

  ngOnInit(): void {
    this.getFishingClub();
    this.createHours();
  }
  createHours(): void {
    for (let i = 0; i < 13; i ++) {
      this.hours.push(i.toString());
    }
    this.minutes.push('00');
    this.minutes.push('25');
    this.minutes.push('50');
    this.minutes.push('75');
  }

  initForm(): void {
    this.day = this.currentDate.getDate() ;
    this.month = this.currentDate.getMonth() + 1;
    let checkDay = null;
    const checkMonth = this.statistic.statistic.months.filter(a => +a.month === this.month);
    if (checkMonth.length > 0) {
      this.monthExists = true;
      checkDay = checkMonth[0].days.filter(b => +b.day === this.day);
      if (checkDay.length > 0) {
        this.dayExists = true;
      }
    }
    let hourMinute: string[] = [];
    if (this.dayExists) {
      hourMinute = checkDay[0].hour.split('.');
    }
    this.statisticForm = new FormGroup({
      hour: new FormControl(this.dayExists ? hourMinute[0] : '1'),
      minutes: new FormControl(this.dayExists ? hourMinute[1] : '00'),
      day: new FormControl(this.day.toString()),
      month: new FormControl(this.monthExists ? checkMonth[0].month : this.month.toString()),
      fishSpecies: new FormArray([]),
    });
    if (this.dayExists) {
      const checkFishSpecies = checkDay[0].fishCatches.filter(o1 => !this.fish.some(o2 => o1.fish === o2));
      if (checkFishSpecies.length > 0) {
        checkFishSpecies.forEach(a => {
          this.fish.push(a.fish);
        });
      }
      checkDay[0].fishCatches.forEach(a => {
        this.fishSpecies.push(new FormGroup({
          fish: new FormControl(a.fish),
          number: new FormControl(a.number),
          other: new FormControl('')
        }));
      });
    }
  }

  addFish(): void {
    this.fishSpecies.push(this.newFish());
  }

  newFish(): FormGroup {
    return new FormGroup({
      fish: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      other: new FormControl(''),
    });
  }

  getFishingClub(): void {
    this.clubService.getFishingClub().subscribe(result => {
      this.fishingClub = result;
      result.fishSpecies.forEach(a => {
        this.fish.push(a.fishSpecie);
      });
      this.initForm();
    });
  }

  onSubmit(): void {
    this.currentStatisticDay = FishCatchHistoryInsertDialogComponent.createDay();
    this.currentCatch = FishCatchHistoryInsertDialogComponent.createFishCatch();
    this.currentMonth = FishCatchHistoryInsertDialogComponent.createMonth();

    this.currentStatisticDay.hour = this.statisticForm.controls.hour.value + '.' + this.statisticForm.controls.minutes.value;
    this.currentStatisticDay.day = this.statisticForm.controls.day.value;
    this.statisticForm.controls.fishSpecies.value.forEach(a => {
      if (a.fish === 'other') {
        a.fish = a.other;
      }
    });
    this.currentStatisticDay.fishCatches = this.statisticForm.controls.fishSpecies.value;
    this.currentMonth.month = this.statisticForm.controls.month.value;
    this.currentMonth.days.push(this.currentStatisticDay);

    if (this.monthExists) {
      const currentMonth = this.statistic.statistic.months.filter(b => b.month === this.month.toString());
      if (this.dayExists) {
        const currentDay = currentMonth[0].days.filter(b => b.day === this.day.toString());
        currentDay[0] = this.currentStatisticDay;
        const days = currentMonth[0].days.filter(a => a.day !== this.day.toString());
        days.push(currentDay[0]);
        currentMonth[0].days = days;
      } else {
        currentMonth[0].days.push(this.currentStatisticDay);
      }
    } else {
      this.statistic.statistic.months.push(this.currentMonth);
    }
    this.fishCatchService.updateStatistic(this.statistic.id, this.statistic).subscribe(result => {
      this.onClose();
      if (result) {
        this.toastr.success('Statistikeintrag erfolgreich gespeichert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCatchRemove(index: number): void {
    this.fishSpecies.removeAt(index);
  }
}
