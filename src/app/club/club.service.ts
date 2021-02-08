import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {Club} from '../core/models/club';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../core/models/user';

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
}
