import {Component, OnInit, ViewChild} from '@angular/core';
import {Licence} from '../../core/models/licence';
import {ExcelExportProperties, GridComponent, RecordDoubleClickEventArgs} from '@syncfusion/ej2-angular-grids';
import {LicenceService} from '../../licence/licence.service';
import {MatDialog} from '@angular/material/dialog';
import {LicenceEditComponent} from '../../licence/licence-edit/licence-edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-licence',
  templateUrl: './admin-licence.component.html',
  styleUrls: ['./admin-licence.component.css']
})
export class AdminLicenceComponent implements OnInit {
  @ViewChild('grid', {static: true}) public grid: GridComponent;
  @ViewChild('template') public data: any;
  licences: Licence[];
  formatOptions = {type: 'date', format: 'dd.MM.yyyy HH:mm:ss'};

  constructor(private licenceService: LicenceService,
              private dialog: MatDialog) {
  }

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
    const licence = this.createNewLicence();
    licence.creatorId = +localStorage.getItem('id');
    const dialogRef = this.dialog.open(LicenceEditComponent, {
      width: '80%',
      height: 'auto',
      data: {licence}
    });
    dialogRef.afterClosed().subscribe(() => this.getLicences());
  }

  createNewLicence(): Licence {
    // tslint:disable-next-line:new-parens
    return new class implements Licence {
      creatorId = 0;
      creatorName = '';
      endDate = new Date();
      licenceId = 0;
      year = new Date().getFullYear();
      licenceName = '';
      paid = false;
      startDate = new Date();
      userId: number;
      userName = '';
    };
  }

  onUpdateLicence(event: RecordDoubleClickEventArgs): void {
    const dialogRef = this.dialog.open(LicenceEditComponent, {
      width: '80%',
      height: 'auto',
      data: {licence: event.rowData as Licence}
    });
    dialogRef.afterClosed().subscribe(() => this.getLicences());
  }

  onDelete(licence: Licence): void {
    Swal.fire({
      title: 'Lizenz ' + licence.licenceName + ' löschen?',
      text: 'Lizenz und zugehörige Statistik werden gelöscht!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja löschen',
      cancelButtonText: 'Abbrechen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenceService.deleteLicence(licence.licenceId).subscribe(response => {
          if (response) {
            Swal.fire('Lizenz löschen', 'Erfolgreich gelöscht', 'success').then(() => this.getLicences());
          }
        }, error => {
          Swal.fire('Lizenz löschen', error.error, 'error').then();
        });
      }
    });
  }
}
