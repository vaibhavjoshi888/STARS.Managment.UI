import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignedInUserDTO } from '../_models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  currentUser: SignedInUserDTO;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  getAllUsers() {
    return this.http.get<any>(`${environment.baseUrl_API}/UserManagement/getuserdetails/${this.currentUser.corpUserId}`)
        .pipe(map(user => {
            return user;
        }));
}
}
