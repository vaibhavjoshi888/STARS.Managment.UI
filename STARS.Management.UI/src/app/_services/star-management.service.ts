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
}
