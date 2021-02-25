import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppUser, ChangePassword, User} from '../core/models/user';
import {map} from 'rxjs/operators';
import {Login} from '../core/models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id).pipe(
      map(user => {
        this.currentUserSource.next(user);
        return user;
      })
    );
  }

  getCurrentUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'users/emailexists?email=' + email);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'login/forgotPassword?email=' + email);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users', user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'users/' + userId, user);
  }

  changeUserPassword(changePassword: ChangePassword): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'users/changePassword', changePassword);
  }

  login(login: Login): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl + 'login', login).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('id', user.userId.toString());
          localStorage.setItem('token', user.token);
          return user;
        }
      })
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }
}
