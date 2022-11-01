import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../_models/user';
import { UserManagementService } from '../_services/user-management.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchusermodalComponent } from '../searchusermodal/searchusermodal.component';
import { ConfirmationDialog } from '../shared/alert/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  // userdetails : any;
  userdetails: UserDTO[] = [];
  selectedUser: UserDTO;
  isNewUser: boolean;

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
      console.log(`Dialog sent: ${value}`);
      this.isNewUser = true;
      this.selectedUser = value;
    });
  }

  async getAllUser() {
    await firstValueFrom(this.userManagementService.getAllUsers())
      .then((res: UserDTO[]) =>
        this.userdetails = res
      )
  };

  async resetUser(event) {
    if (event) {
      this.selectedUser = null;
      await this.getAllUser();
    }
  }

  editUser(user){
    this.isNewUser = false;
    this.selectedUser = user;
  }

  async deleteUser(userId){
    await firstValueFrom(this.userManagementService.deleteUserDetails(userId));
  }

  openDeleteDialog(userId) {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
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
