import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../_models/user';
import { UserManagementService } from '../_services/user-management.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchusermodalComponent } from '../searchusermodal/searchusermodal.component';
import { ConfirmationDialog } from '../shared/alert/confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  userdetails: UserDTO[] = [];
  InitialLoad: UserDTO[] = [];
  selectedUser: UserDTO;
  isNewUser: boolean;
  chkAllIsSelected: boolean;
  chkSuperIsSelected: boolean;
  chkSiteIsSelected: boolean;
  searchText: string = "";

  constructor(private userManagementService: UserManagementService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.getAllUser();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';
    let dialogRef = this.dialog.open(SearchusermodalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.isNewUser = true;
      this.selectedUser = value;
    });
  }

  async getAllUser() {
    await firstValueFrom(this.userManagementService.getAllUsers())
      .then((res: UserDTO[]) => {
        this.userdetails = res;
        this.InitialLoad = res;
      }
      )
  };

  getUserList() {
    if (this.searchText != '') {
      this.userdetails = this.userdetails.filter(f => f.fullName.toLocaleLowerCase().includes(this.searchText) || f.corpID.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }
    else {
      this.userdetails = this.InitialLoad;
    }
  }

  getUserByRole(event) {
    const type = event.target.id;

    const isChecked = event.target.checked;

    if (type == "chkSuperAdmin") {

      this.chkSuperIsSelected = isChecked;

      if (this.chkSuperIsSelected && this.chkSiteIsSelected) {
        this.userdetails = this.InitialLoad;
      }
      else if (this.chkSuperIsSelected) {
        this.userdetails = this.userdetails.filter(f => f.userRoleId == 2);
      }
      else if (this.chkSiteIsSelected) {
        this.userdetails = this.userdetails.filter(f => f.userRoleId == 1);
      }
      else{
        this.userdetails = this.InitialLoad;
      }
    }
    else if (type == "chkSiteAdmin") {

      this.chkSiteIsSelected = isChecked;

      if (this.chkSuperIsSelected && this.chkSiteIsSelected) {
        this.userdetails = this.InitialLoad;
      }
      else if (this.chkSiteIsSelected) {
        this.userdetails = this.userdetails.filter(f => f.userRoleId == 1);
      }
      else if (this.chkSuperIsSelected) {
        this.userdetails = this.userdetails.filter(f => f.userRoleId == 2);
      }
      else{
        this.userdetails = this.InitialLoad;
      }
    }
    else {
      this.userdetails = this.InitialLoad;
    }
  }

  async resetUser(event) {
    if (event) {
      this.selectedUser = null;
      await this.getAllUser();
    }
  }

  editUser(user) {
    this.isNewUser = false;
    this.selectedUser = user;
  }

  async deleteUser(userId) {
    await firstValueFrom(this.userManagementService.deleteUserDetails(userId));
  }

  openDeleteDialog(userId) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(userId);
        this.resetUser(true);
        window.location.reload();
      }
    });
    
  }
}
