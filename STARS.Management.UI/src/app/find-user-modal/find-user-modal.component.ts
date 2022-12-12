import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Stars, StarsDto } from '../_models/stars';
import { UserDTO } from '../_models/user';
import { StarManagementService } from '../_services/star-management.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-find-user-modal',
  templateUrl: './find-user-modal.component.html',
  styleUrls: ['./find-user-modal.component.css']
})
export class FindUserModalComponent implements OnInit {
  starDetails: StarsDto[];
  InitialLoad: StarsDto[];
  searchText: string;
  searchedUserList: UserDTO[];
  selectedUser: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FindUserModalComponent>,
  private userService : UserService, public dialog: MatDialog) { }

  async ngOnInit() {
    // await this.searchADUsers();
  }

  close() {
    this.dialogRef.close();
  }

  saveSelectedUser() {
    this.dialogRef.close(this.selectedUser);

  }

  userItemOnSelect(event) {
    this.selectedUser = event;
  }


  async searchADUsers() {
    await firstValueFrom(this.userService.searchUsers(this.searchText)).then((res: UserDTO[]) => {
      this.searchedUserList = res;
    })
  };

  closeModal() {
    this.dialog.closeAll();
  }
}

