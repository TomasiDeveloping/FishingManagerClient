import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppUser} from '../core/models/user';
import {Login} from '../core/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl + 'login/login', login);
  }
}
