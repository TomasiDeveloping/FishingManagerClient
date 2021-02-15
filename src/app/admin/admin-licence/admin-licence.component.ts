import {Component, OnInit, ViewChild} from '@angular/core';
import {Licence} from '../../core/models/licence';
import {ClubService} from '../../club/club.service';
import {ExcelExportProperties, GridComponent} from '@syncfusion/ej2-angular-grids';
import {LicenceService} from '../../licence/licence.service';

@Component({
  selector: 'app-admin-licence',
  templateUrl: './admin-licence.component.html',
  styleUrls: ['./admin-licence.component.css']
})
export class AdminLicenceComponent implements OnInit {
  @ViewChild('grid', {static: true}) public grid: GridComponent;
  licences: Licence[];
  formatOptions = { type: 'date', format: 'dd.MM.yyyy HH:mm:ss' };

  constructor(private licenceService: LicenceService) { }

  ngOnInit(): void {
    this.getLicences();
  }

  getLicences(): void {
    this.licenceService.getLicences().subscribe(result => {
      this.licences = result;
    });
  }

  toolbarClick(args: any): void {
    if (args.item.text === 'Excel Export') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Lizenzen.xlsx',
      };
      this.grid.excelExport(excelExportProperties).then();
    }
  }

  onAddLicence(): void {
  }
}
