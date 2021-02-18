import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxNavbarModule} from 'ngx-bootstrap-navbar';
import { UserComponent } from './user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { LicenceComponent } from './licence/licence.component';
import { FishCatchHistoryComponent } from './fishCatchHistory/fish-catch-history.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AdminComponent } from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ClubComponent } from './club/club.component';
import { SparingTimesComponent } from './club/sparing-times/sparing-times.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { LicenceCardComponent } from './licence/licence-card/licence-card.component';
import {MomentModule} from 'ngx-moment';
import {ToastrModule} from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserCardComponent } from './user/user-card/user-card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { InfringementComponent } from './infringement/infringement.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FishCatchHistoryDialogComponent } from './fishCatchHistory/fish-catch-history-dialog/fish-catch-history-dialog.component';
import { CurrentDayStatisticDialogComponent } from './supervisor/current-day-statistic-dialog/current-day-statistic-dialog.component';
import { InsertInfringementDialogComponent } from './infringement/insert-infringement-dialog/insert-infringement-dialog.component';
import { FishCatchHistoryInsertDialogComponent } from './fishCatchHistory/fish-catch-history-insert-dialog/fish-catch-history-insert-dialog.component';
import { UserUpdateDialogComponent } from './user/user-update-dialog/user-update-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import {
  DetailRowService,
  ExcelExportService,
  FilterService,
  GridModule,
  PageService,
  ResizeService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { AdminLicenceComponent } from './admin/admin-licence/admin-licence.component';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';
import { AdminClubComponent } from './admin/admin-club/admin-club.component';
import { EditClubComponent } from './admin/admin-club/edit-club/edit-club.component';
import { EditFishSpeciesComponent } from './admin/admin-club/edit-fish-species/edit-fish-species.component';
import { EditRulesComponent } from './admin/admin-club/edit-rules/edit-rules.component';
import { LicenceEditComponent } from './licence/licence-edit/licence-edit.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { FooterComponent } from './core/footer/footer.component';
import { ClubRulesComponent } from './club/club-rules/club-rules.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SpinnerInterceptor} from './core/interceptors/spinner.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NavigationComponent,
    LicenceComponent,
    FishCatchHistoryComponent,
    SupervisorComponent,
    AdminComponent,
    LoginComponent,
    ClubComponent,
    SparingTimesComponent,
    LicenceCardComponent,
    UserCardComponent,
    InfringementComponent,
    FishCatchHistoryDialogComponent,
    CurrentDayStatisticDialogComponent,
    InsertInfringementDialogComponent,
    FishCatchHistoryInsertDialogComponent,
    UserUpdateDialogComponent,
    AdminUsersComponent,
    AdminLicenceComponent,
    AdminStatisticsComponent,
    AdminClubComponent,
    EditClubComponent,
    EditFishSpeciesComponent,
    EditRulesComponent,
    LicenceEditComponent,
    FooterComponent,
    ClubRulesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    NgxNavbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MomentModule.forRoot(),
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    NgxSpinnerModule,
    GridModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    PageService,
    ToolbarService,
    ExcelExportService,
    DetailRowService,
    FilterService,
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
