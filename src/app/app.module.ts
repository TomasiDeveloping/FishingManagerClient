import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxNavbarModule} from 'ngx-bootstrap-navbar';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
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
    MomentModule.forRoot(),
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
