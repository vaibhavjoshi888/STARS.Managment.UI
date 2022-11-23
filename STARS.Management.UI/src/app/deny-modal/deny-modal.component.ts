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
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  close() {
    this.dialogRef.close();
  }

  saveSelectedUser() {
    this.updateStarRequest(this.selectedUser,3)
    this.dialogRef.close(this.selectedUser);
  }

  userItemOnSelect(event) {  
    this.selectedUser = event;
  }
  
  async updateStarRequest(user: UserStarConfigurationDTO, status) {

    let updateStarRequest = new UpdateStarRequestDTO();

    updateStarRequest.userStarId = user.userStarId;
    updateStarRequest.corpUserId = user.corpUserId;
    updateStarRequest.employeeName = user.employeeName;
    updateStarRequest.status = status == "2" ? "A" : "D";
    updateStarRequest.approvedby = this.currentUser.corpUserId.toString();
    updateStarRequest.message = this.message;
    updateStarRequest.modifiedBy = this.currentUser.corpUserId.toString();
    updateStarRequest.feedback = "";

    await firstValueFrom(this.starManagementService.updateStarRequest(updateStarRequest.userStarId, updateStarRequest));
    window.location.reload();
  };

}
