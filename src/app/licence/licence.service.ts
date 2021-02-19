import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Licence} from '../core/models/licence';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getLicences(): Observable<Licence[]> {
    return this.http.get<Licence[]>(this.baseUrl + 'licences');
  }

  getLicenceByUserId(userId: number): Observable<Licence[]> {
    return this.http.get<Licence[]>(this.baseUrl + 'users/licences/' + userId);
  }

  insertLicence(licence: Licence): Observable<Licence> {
    return this.http.post<Licence>(this.baseUrl + 'licences', licence);
  }

  updateLicence(licenceId: number, licence: Licence): Observable<Licence> {
    return this.http.put<Licence>(this.baseUrl + 'licences/' + licenceId, licence);
  }

  deleteLicence(licenceId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + 'licences/' + licenceId);
  }
}
