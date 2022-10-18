import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignedInUserDTO } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<SignedInUserDTO>;
    public currentUser: Observable<SignedInUserDTO>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<SignedInUserDTO>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): SignedInUserDTO {
        return this.currentUserSubject.value;
    }

    login(userName, password) {
          return this.http.post<any>(`${environment.baseUrl_API}/UserManagement/isvaliduser`, { userName, password })
              .pipe(map(user => {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  return user;
              }));
        let user: User = new User;
        user.firstName = userName;
        user.lastName = "";
        user.password = password;
        user.token = "";
        user.username = userName;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return of(user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
