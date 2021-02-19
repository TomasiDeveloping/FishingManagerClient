import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  sendContactMail(contact: { name: string, email: string, message: string }): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'service/contact', contact);
  }
}
