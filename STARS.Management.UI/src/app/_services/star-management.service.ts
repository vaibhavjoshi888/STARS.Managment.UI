import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignedInUserDTO } from '../_models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StarManagementService {
  currentUser: SignedInUserDTO;
  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  getAllActiveStars() {
    return this.http.get<any>(`${environment.baseUrl_API}/StarManagement/getallactivestars`)
      .pipe(map(star => {
        return star;
      }));
  }

  

  getStarRequest() {
    return this.http.get<any>(`${environment.baseUrl_API}/StarManagement/getstarreaquest`)
      .pipe(map(star => {
        return star;
      }));
  }

  getStarRequestCount() {
    return this.http.get<any>(`${environment.baseUrl_API}/StarManagement/getStarreaquestcount`)
      .pipe(map(star => {
        return star;
      }));
  }

  updateStarRequest(userstarid,data) {
    return this.http.put<any>(`${environment.baseUrl_API}/StarManagement/updatestarrequest/${userstarid}`, data);
  }
  
  submitStarRequest(data) {
    return this.http.post<any>(`${environment.baseUrl_API}/StarManagement/submitstarrequest`, data);
  }
}
