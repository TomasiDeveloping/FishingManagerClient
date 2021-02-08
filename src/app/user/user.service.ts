import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {AppUser, User} from '../core/models/user';
import {map} from 'rxjs/operators';
import {Login} from '../core/models/login';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();
  appUser: AppUser;

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id).pipe(
      map(user => {
        this.currentUserSource.next(user);
        return user;
      })
    );
  }

  login(login: Login): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl + 'login/login', login).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('id', user.userId.toString());
          return user;
        }
      })
    );
  }

  logout(): void{
    localStorage.removeItem('id');
    this.currentUserSource.next(null);
  }
}
