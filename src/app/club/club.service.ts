import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Club} from '../core/models/club';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../core/models/user';
import {Licence} from '../core/models/licence';
import {Statistic} from '../core/models/statistic';
import {Right} from '../core/models/right';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  baseUrl = environment.apiUrl;
  fishingClub: Club;

  constructor(private http: HttpClient) { }

  getFishingClub(): Observable<Club> {
    if (this.fishingClub) {
      return of(this.fishingClub);
    }
    return this.http.get<Club>(this.baseUrl + 'club').pipe(
      map(result => {
        this.fishingClub = result;
        return result;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'club/users');
  }

  getLicences(): Observable<Licence[]> {
    return this.http.get<Licence[]>(this.baseUrl + 'club/licences');
  }

  getStatistics(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(this.baseUrl + 'club/statistics');
  }

  getRights(): Observable<Right[]> {
    return this.http.get<Right[]>(this.baseUrl + 'club/rights');
  }

  updateFishingClub(id: number, fishingClub: Club): Observable<Club> {
    return this.http.put<Club>(this.baseUrl + 'club/' + id, fishingClub);
  }

}
