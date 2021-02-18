import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SpinnerService} from '../services/spinner.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'DELETE') {
      return next.handle(req);
    }
    if (req.url.includes('emailexists')) {
      return next.handle(req);
    }
    this.spinnerService.busy();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.idle();
      })
    );
  }
}
