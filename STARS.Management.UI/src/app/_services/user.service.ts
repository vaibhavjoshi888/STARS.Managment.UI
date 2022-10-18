import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignedInUserDTO } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<SignedInUserDTO[]>(`${environment.baseUrl_API}/users`);
  }

  register(user: SignedInUserDTO) {
      return this.http.post(`${environment.baseUrl_API}/users/register`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.baseUrl_API}/users/${id}`);
  }
}