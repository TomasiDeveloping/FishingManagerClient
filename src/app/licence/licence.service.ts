import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Licence} from '../core/models/licence';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLicenceByUserId(userId: number): Observable<Licence[]> {
    return this.http.get<Licence[]>(this.baseUrl + 'users/licences/' + userId);
  }

  getLicenceById(licenceId: number): Observable<Licence> {
    return this.http.get<Licence>(this.baseUrl + 'licences/' + licenceId);
  }
}
