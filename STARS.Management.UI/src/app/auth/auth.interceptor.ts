import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith(environment.baseUrl_API)) {

      const authenticationToken = this.authService.getAuthenticationToken();

      // could do a expiry check, but the server will do this anyway

      if (authenticationToken) {
        let headers: HttpHeaders = req.headers;
        headers = headers.set('Authorization', 'Bearer ' + authenticationToken);

        const modified = req.clone({ headers });
        return next.handle(modified);
      } else {
        console.log('No auth token found');
      }
    }
    // is a call to somewhere that does not want our authenticationToken
    return next.handle(req);
  }
}
