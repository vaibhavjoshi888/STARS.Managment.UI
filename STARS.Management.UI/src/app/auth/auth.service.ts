import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { LoginCredential, LoginResponse, Registration, ResetCredential, UserInfo, UserProfile } from './auth.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public timeStamper = Math.floor(Math.random() * 1000000);

  public redirectUrl: string;
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public user: UserInfo;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public returnHome() {
    // centralise where unauthenticated users end up
    this.router.navigate(['/home']);
  }

  public logout(ref?: string) {
    localStorage.clear();
    this.isLoggedIn$.next(false);
    if (ref) {
      this.router.navigate(['/auth/login'], { queryParams: { ref } });
      return;
    }
    this.router.navigate(['/auth/login']);
  }

  public login(credential: LoginCredential) {
    this.isLoggedIn$.next(false);

    if (credential) {
      const body = credential; // class so do not wrap
      const url = environment.baseUrl_API + '/accounts/login';

      return this.http.post<LoginResponse>(url, body, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          tap(async (data: LoginResponse) => {
            await this.processLogin(data);
            //return this.isLoggedIn$.value;
          }),
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              return throwError(() => new Error('Your details are not correct, please try again.'));
            } else {
              return this.handleError('AuthService.login', err);
            }
          })
        );
    }

    return null;
  }

  public getAuthenticationToken(): string {
    return localStorage.getItem('authenticationToken') ?? '';
  }

  private async processLogin(loginResponse: LoginResponse) {
    if (loginResponse.authenticationToken.length > 16
      && (new Date(loginResponse.authenticationTokenExpiry) > new Date())) {

      localStorage.setItem('authenticationToken', loginResponse.authenticationToken);
      localStorage.setItem('authenticationTokenExpiry', loginResponse.authenticationTokenExpiry);

      const jwtData = loginResponse.authenticationToken.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);

      this.user = new UserInfo();
      this.user.userId = decodedJwtData.sub;
      this.user.knownAs = decodedJwtData.app_KnownAs;
      this.user.fullName = decodedJwtData.app_FullName;

      this.user.whenCurrentLogin = decodedJwtData.app_WhenCurrentLogin;
      this.user.whenPreviousLogin = decodedJwtData.app_WhenPreviousLogin;

      await firstValueFrom(this.getCurrentUser(decodedJwtData.sub))
        .then((profileResponse: UserProfile) => {
          this.user.profile = profileResponse;

          this.isLoggedIn$.next(true);
        });

    } else {
      localStorage.clear();
      this.isLoggedIn$.next(false);
    }
  }

  public forgotten(emailAddress: string) {
    if (emailAddress && emailAddress.trim().length > 6) {

      const body = { emailAddress }; // primitive type so wrap it
      const url = environment.baseUrl_API + '/accounts/forgotten';

      return this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              return throwError(() => new Error('Your details are not correct, please try again.'));
            } else {
              return this.handleError('AuthService.forgotten', err);
            }
          })
        );
    }

    return null;
  }

  public resetPassword(credential: ResetCredential) {
    if (credential) {
      const body = credential; // class so do not wrap
      const url = environment.baseUrl_API + '/accounts/resetpassword';

      return this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 404) {
              return throwError(() => new Error('Your details are not correct, please try again.'));
            } else {
              return this.handleError('AuthService.resetPassword', err);
            }
          })
        );
    }
    return null;
  }

  public register(registration: Registration) {
    if (registration) {
      const body = registration; // class so do not wrap
      const url = environment.baseUrl_API + '/registrations/register';

      return this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          catchError((err: HttpErrorResponse) => this.handleError('AuthService.register', err)),
        );
    }
    return null;
  }

  public getCurrentUser(userId: string): Observable<UserProfile> {
    const url = environment.baseUrl_API + '/accounts/' + userId;

    return this.http.get<UserProfile>(url)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError('AuthService.getCurrentUser', err)),
      );
  }

  private handleError(operation: string, error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred in '${operation}':`, error.error.message);

    } else if (error.status === 200) {
      // the backend returned a valid response code, but the client has popped still
      console.error(`API returned HTTP200 but still failed in '${operation}': ${error.message} body was: ${error.error.text}`);

    } else {
      // The backend returned an unsuccessful response code.
      if (error.error) {
        console.error(`API returned HTTP${error.status} in '${operation}':, body was: ${error.error.text}`);
      }
    }
    return throwError(() => new Error('Oh no! Something bad happened in the system. Please try again later.'));
  }
}

