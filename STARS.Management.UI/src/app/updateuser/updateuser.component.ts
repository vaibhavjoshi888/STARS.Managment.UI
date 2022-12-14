import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ManageuserComponent } from '../manageuser/manageuser.component';
import { UserAssignRoleDTO, UserDTO } from '../_models/user';
import { MessageService } from '../_services/message.service';
import { UserManagementService } from '../_services/user-management.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  private formBuilder: FormBuilder;
  userDTO: UserDTO;
  userAssignRoleDTO: UserAssignRoleDTO
  @Input() selectedUser: UserDTO;
  @Input() isNewUser: boolean;

  @Output() selectedUserReset: EventEmitter<boolean> = new EventEmitter<boolean>();


  roleOptions: { id: number; value: string; selected?: boolean }[];
  selectedOption: number;


  constructor(private userManagementService: UserManagementService,
    private router: Router,
    private messageservice: MessageService
  ) { }

  ngOnInit(): void {

    this.roleOptions = [
      { id: 1, value: "Site Admin" },
      { id: 2, value: "Super Admin" }
    ]

    this.userDTO = this.selectedUser;
    if (this.userDTO.userRoleId == 0) {
      this.selectedOption = 0;
    }
    else{
      this.selectedOption = this.userDTO.userRoleId;
    }
  }

  async saveUser() {

    this.userDTO.userRoleId = this.selectedOption;
    this.userDTO.createdBy = this.messageservice.currentuser;
    this.userDTO.createdDate = new Date;
    this.userManagementService.saveUserDetails(this.userDTO)
      .subscribe(
        data => {
          this.refresh();
        },
        error => {
          // this.alertService.error(error);
          console.log(error);
        });
        this.selectedOption = 0;
  }

  async updateUser() {
    this.userAssignRoleDTO = new UserAssignRoleDTO;
    this.userAssignRoleDTO.UserRoleId = this.selectedOption;
    await firstValueFrom(this.userManagementService.editUserDetails(this.userDTO.corpID, this.userAssignRoleDTO))
      .then((res) => {
        this.refresh();
      })
  }

  cancel() {
    this.refresh();
  }

  refresh() {
    this.selectedUserReset.emit(true);
    this.router.navigate(['/manageuser']);
    window.location.reload();
  }
}
