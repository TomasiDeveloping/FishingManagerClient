import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ClubService} from '../../club/club.service';
import {Statistic} from '../../core/models/statistic';
import {MatDialog} from '@angular/material/dialog';
import {FishCatchHistoryDialogComponent} from '../../fishCatchHistory/fish-catch-history-dialog/fish-catch-history-dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FishCatchHistoryService} from '../../fishCatchHistory/fish-catch-history.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
  statistics: Statistic[];
  @ViewChild('template') public data: TemplateRef<Statistic>;
  createLicenceForm: FormGroup;
  currentYear = new Date();
  years: string[] = [];

  constructor(private clubService: ClubService,
              private toastr: ToastrService,
              private statisticService: FishCatchHistoryService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getStatistics();
    this.initForm();
  }

  initForm(): void {
    for (let i = 0; i < 5; i++) {
      this.years.push((this.currentYear.getFullYear() - i).toString());
    }
    this.createLicenceForm = new FormGroup({
      year: new FormControl('', Validators.required)
    });
  }

  getStatistics(): void {
    this.clubService.getStatistics().subscribe(result => {
      this.statistics = result;
    });
  }

  onStatistic(statistic: Statistic): void {
    this.dialog.open(FishCatchHistoryDialogComponent, {
      width: '80%',
      height: 'auto',
      data: statistic.licenceId
    });
  }

  onCreateStatisticOfYear(): void {
    this.statisticService.createStatisticOfYear(this.createLicenceForm.controls.year.value).subscribe(response => {
      const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = 'Statistik_' + this.createLicenceForm.controls.year.value;
      anchor.href = url;
      anchor.click();
      this.createLicenceForm.reset();
      this.toastr.success('Jahresstatistik wurde erstellt');
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
