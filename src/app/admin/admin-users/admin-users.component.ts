import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from '../../club/club.service';
import {User} from '../../core/models/user';
import {ColumnDirective, GridComponent, GridModel, ExcelExportProperties, RecordDoubleClickEventArgs} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from '@angular/material/dialog';
import {UserUpdateDialogComponent} from '../../user/user-update-dialog/user-update-dialog.component';
import {Address} from '../../core/models/address';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private clubService: ClubService,
              private dialog: MatDialog) {
  }

  @ViewChild('grid', {static: true}) public grid: GridComponent;
  users: User[];
  public childGrid: GridModel;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.initChildGrid();
    this.clubService.getUsers().subscribe(result => {
      this.users = result;
      this.initChildGrid();
    });
  }

  initChildGrid(): void {
    this.childGrid = {
      dataSource: this.users,
      queryString: 'userId',
      allowResizing: true,
      columns: [
        {field: 'address.title', headerText: 'Anrede', textAlign: 'Left', width: '80'},
        {field: 'address.street', headerText: 'Strasse', textAlign: 'Left', width: '120'},
        {field: 'address.addressAddition', headerText: 'Adresszusatz', textAlign: 'Left', width: '120'},
        {field: 'address.zip', headerText: 'PLZ', textAlign: 'Left', width: '120'},
        {field: 'address.city', headerText: 'Ort', textAlign: 'Left', width: '120'},
        {field: 'address.phone', headerText: 'Tel', textAlign: 'Left', width: '120'}
      ],
    };
  }

  toolbarClick(args: any): void {
    if (args.item.text === 'Excel Export') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Adressen.xlsx',
      };
      (this.grid.columns[4] as ColumnDirective).visible = false;
      (this.grid.columns[5] as ColumnDirective).visible = false;

      (this.grid.columns[6] as ColumnDirective).visible = true;
      (this.grid.columns[7] as ColumnDirective).visible = true;
      (this.grid.columns[8] as ColumnDirective).visible = true;
      (this.grid.columns[9] as ColumnDirective).visible = true;
      (this.grid.columns[10] as ColumnDirective).visible = true;
      (this.grid.columns[11] as ColumnDirective).visible = true;
      this.grid.excelExport(excelExportProperties).then();
    }
  }

  onEditUser(event: RecordDoubleClickEventArgs): void {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '80%',
      height: 'auto',
      data: {user: event.rowData as User, isAdmin: true}
    });
    dialogRef.afterClosed().subscribe(() => {
        this.getUsers();
      }
    );
  }

  onAddUser(): void {
    const user = this.newUser();
    user.address = this.newAddress();
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      width: '80%',
      height: 'auto',
      data: {user, isAdmin: true}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  newUser(): User {
    // tslint:disable-next-line:new-parens
    return new class implements User {
      PictureUrl = '';
      active = true;
      address: Address;
      email = '';
      firstName = '';
      lastName = '';
      rightId = 0;
      rightName = '';
      userId = 0;
    };
  }

  newAddress(): Address {
    // tslint:disable-next-line:new-parens
    return new class implements Address {
      addressAddition = '';
      city = '';
      id = 0;
      phone = '';
      street = '';
      title = '';
      zip = 0;
    };
  }
}
