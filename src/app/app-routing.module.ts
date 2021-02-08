import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LicenceComponent} from './licence/licence.component';
import {FishCatchHistoryComponent} from './fishCatchHistory/fish-catch-history.component';
import {SupervisorComponent} from './supervisor/supervisor.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'lizenzen', component: LicenceComponent},
  {path: 'fangstatistik', component: FishCatchHistoryComponent},
  {path: 'aufseher', component: SupervisorComponent},
  {path: 'admin', component: AdminComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
