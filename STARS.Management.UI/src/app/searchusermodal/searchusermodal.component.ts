import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-searchusermodal',
  templateUrl: './searchusermodal.component.html',
  styleUrls: ['./searchusermodal.component.css']
})
export class SearchusermodalComponent implements OnInit {

  searchedUserList: UserDTO[];
  searchText: string = "";
  selectedUser: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SearchusermodalComponent>,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  async searchADUsers() {
    await firstValueFrom(this.userService.searchUsers(this.searchText)).then((res: UserDTO[]) => {
      this.searchedUserList = res;
    })
  };

  userItemOnSelect(event) {
    this.selectedUser = event;
  }

  saveSelectedUser() {
    this.dialogRef.close(this.selectedUser);
  }
}
