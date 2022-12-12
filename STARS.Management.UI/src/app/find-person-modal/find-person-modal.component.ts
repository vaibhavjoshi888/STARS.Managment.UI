import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Stars, StarsDto } from '../_models/stars';
import { UserDTO } from '../_models/user';
import { StarManagementService } from '../_services/star-management.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-find-person-modal',
  templateUrl: './find-person-modal.component.html',
  styleUrls: ['./find-person-modal.component.css']
})
export class FindPersonModalComponent implements OnInit {
  starDetails: StarsDto[];
  InitialLoad: StarsDto[];
  searchText: string;
  searchedUserList: UserDTO[];
  selectedUser: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FindPersonModalComponent>,
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

  closeModal() {
    this.dialog.closeAll();
  }


  async searchADUsers() {
    await firstValueFrom(this.userService.searchUsers(this.searchText)).then((res: UserDTO[]) => {
      this.searchedUserList = res;
    })
  };
}


