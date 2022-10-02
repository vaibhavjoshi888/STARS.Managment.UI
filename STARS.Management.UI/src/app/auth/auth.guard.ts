import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
      // if (this.authService.isLoggedIn$.value && this.authService.getAuthenticationToken()) {
      //   return true;
      // } else {
      //   this.authService.redirectUrl = state.url;
      //   this.authService.logout();
      //   return false;
      // }]
  }
  
}
