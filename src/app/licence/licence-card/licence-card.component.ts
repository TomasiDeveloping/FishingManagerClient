import {Component, OnInit} from '@angular/core';
import {LicenceService} from '../licence.service';
import {Licence} from '../../core/models/licence';

@Component({
  selector: 'app-licence-card',
  templateUrl: './licence-card.component.html',
  styleUrls: ['./licence-card.component.css']
})
export class LicenceCardComponent implements OnInit {
  licences: Licence[];
  currentDate = new Date();

  constructor(private licenceService: LicenceService) {
  }

  ngOnInit(): void {
    this.getLicencesByUser();
  }

  getLicencesByUser(): void {
    this.licenceService.getLicenceByUserId(+localStorage.getItem('id')).subscribe(result => {
      this.licences = result;
    });
  }
}
