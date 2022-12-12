import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { UpdateStarRequestDTO, UserStarConfigurationDTO } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StarManagementService } from 'src/app/_services/star-management.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-deny-modal',
  templateUrl: './deny-modal.component.html',
  styleUrls: ['./deny-modal.component.css']
})
export class DenyModalComponent implements OnInit {
  selectedUser: any;
  currentUser: any;
  message : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DenyModalComponent>,
  private userService : UserService,private authenticationService: AuthenticationService,
  private starManagementService: StarManagementService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  close() {
    this.dialogRef.close();
  }

  saveSelectedUser() {
    // this.updateStarRequest(this.selectedUser,3)
    this.dialogRef.close(this.selectedUser);
  }

  userItemOnSelect(event) {
    this.selectedUser = event;
  }

  async updateStarRequest() {

    let updateStarRequest = new UpdateStarRequestDTO();

    updateStarRequest.userStarId = this.data.userStarId;
    updateStarRequest.corpUserId = this.data.corpUserId;
    updateStarRequest.employeeName = this.data.employeeName;
    updateStarRequest.status = this.data.status == "2" ? "A" : "D";
    updateStarRequest.approvedby = this.currentUser.corpUserId.toString();
    updateStarRequest.message = this.message;
    updateStarRequest.modifiedBy = this.currentUser.corpUserId.toString();
    updateStarRequest.feedback = this.message;

    await firstValueFrom(this.starManagementService.updateStarRequest(updateStarRequest.userStarId, updateStarRequest));
    // window.location.reload();
  };

}
