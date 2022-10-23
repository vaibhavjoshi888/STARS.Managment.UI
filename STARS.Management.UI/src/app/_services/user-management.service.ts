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
    return this.http.get<any>(`${environment.baseUrl_API}/UserManagement/getuserdetails`)
      .pipe(map(user => {
        return user;
      }));
  }

  saveUserDetails(user) {
    return this.http.post<any>(`${environment.baseUrl_API}/UserManagement/user`, user);
  }

  editUserDetails(corpUserId,data) {
    return this.http.put<any>(`${environment.baseUrl_API}/UserManagement/user/${corpUserId}`, data);
  }

  deleteUserDetails(corpUserId) {
    return this.http.delete<any>(`${environment.baseUrl_API}/UserManagement/deleteuser/${corpUserId}`);
  }
}
