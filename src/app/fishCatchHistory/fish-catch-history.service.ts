import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistic} from '../core/models/statistic';

@Injectable({
  providedIn: 'root'
})
export class FishCatchHistoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStatisticByUserId(userId: number): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(this.baseUrl + 'users/statistics/' + userId);
  }

  getStatisticByLicenceId(licenceId: number): Observable<Statistic> {
    return this.http.get<Statistic>(this.baseUrl + 'statistics/licence/' + licenceId);
  }

  updateStatistic(statisticId: number, statistic: Statistic): Observable<Statistic> {
    return this.http.put<Statistic>(this.baseUrl + 'statistics/' + statisticId, statistic);
  }
}
