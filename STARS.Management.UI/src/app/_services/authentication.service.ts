import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        //   return this.http.post<any>(`${environment.baseUrl_API}/users/authenticate`, { username, password })
        //       .pipe(map(user => {
        //           // store user details and jwt token in local storage to keep user logged in between page refreshes
        //           localStorage.setItem('currentUser', JSON.stringify(user));
        //           this.currentUserSubject.next(user);
        //           return user;
        //       }));
        let user: User = new User;
        user.firstName = username;
        user.lastName = "";
        user.password = "tiger";
        user.token = "";
        user.username = "VaiJosh";
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