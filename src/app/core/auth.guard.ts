import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {map} from 'rxjs/operators';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.currentUser$.pipe(
      map((user: User) => {
        if (state.url === '/aufseher') {
          if (!user) {
            return this.router.createUrlTree(['/home']);
          }
          if (user.rightName === 'System-Admin' || user.rightName === 'Aufseher' || user.rightName === 'Administrator') {
            return true;
          }
        }
        if (!user) {
          return this.router.createUrlTree(['/home']);
        }
        if (state.url === '/admin') {
          if (user.rightName === 'System-Admin' || user.rightName === 'Administrator') {
            return true;
          }
        }
      })
    );
  }
}
