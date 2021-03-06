import {Component, OnInit} from '@angular/core';
import {LicenceService} from '../licence.service';
import {Licence} from '../../core/models/licence';

@Component({
  selector: 'app-licence-card',
  templateUrl: './licence-card.component.html',
  styleUrls: ['./licence-card.component.css']
})
export class LicenceCardComponent implements OnInit {
  licences: Licence[] = [];
  oldLicences: Licence[] = [];
  currentDate = new Date();
  panelOpenState = false;

  constructor(private licenceService: LicenceService) {
  }

  ngOnInit(): void {
    this.getLicencesByUser();
  }

  getLicencesByUser(): void {
    this.licenceService.getLicenceByUserId(+localStorage.getItem('id')).subscribe(result => {
      result.forEach(l => {
        if (l.year === this.currentDate.getFullYear()) {
          this.licences.push(l);
        } else {
          this.oldLicences.push(l);
        }
      });
    });
  }
}
