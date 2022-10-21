import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../_models/user';
import { UserManagementService } from '../_services/user-management.service';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  // userdetails : any;
  userdetails : UserDTO[] = [];
  constructor(private userManagementService : UserManagementService) { }

  async ngOnInit() {
    await this.getAllUser();
  }

  async getAllUser() {
    await firstValueFrom(this.userManagementService.getAllUsers())
    .then((res : UserDTO[]) => 
    this.userdetails = res
    )};
}
