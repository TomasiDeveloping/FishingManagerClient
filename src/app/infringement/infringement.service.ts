import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Infringement} from '../core/models/infringement';

@Injectable({
  providedIn: 'root'
})
export class InfringementService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInfringements(): Observable<Infringement[]> {
    return this.http.get<Infringement[]>(this.baseUrl + 'infringements');
  }

  getInfringementById(id: number): Observable<Infringement> {
    return this.http.get<Infringement>(this.baseUrl + 'infringements/' + id);
  }

  getInfringementsByUserId(userId: number): Observable<Infringement[]> {
    return this.http.get<Infringement[]>(this.baseUrl + 'infringements/user/' + userId);
  }

  insertInfringement(infringement: Infringement): Observable<Infringement> {
    return this.http.post<Infringement>(this.baseUrl + 'infringements', infringement);
  }
}
