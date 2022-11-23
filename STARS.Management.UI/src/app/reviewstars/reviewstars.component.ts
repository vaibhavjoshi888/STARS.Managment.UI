import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { StarRequestCountDTO, UpdateStarRequestDTO, UserStarConfigurationDTO } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { StarManagementService } from '../_services/star-management.service';
import { DenyModalComponent } from '../deny-modal/deny-modal.component';

@Component({
  selector: 'app-reviewstars',
  templateUrl: './reviewstars.component.html',
  styleUrls: ['./reviewstars.component.css']
})
export class ReviewstarsComponent implements OnInit {

  userdetails: UserStarConfigurationDTO[];
  requestCount: StarRequestCountDTO;
  currentUser: any;
  InitialLoad: UserStarConfigurationDTO[];
  chkAllIsSelected: boolean;
  chkPendingIsSelected: boolean;
  chkApprovedIsSelected: boolean;
  chkDeniedIsSelected: boolean;
  searchText: string = "";

  constructor(private starManagementService: StarManagementService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    await Promise.all([this.getAllUser(), this.getStarRequestCount()]);
  }

  async getStarRequestCount() {
    await firstValueFrom(this.starManagementService.getStarRequestCount())
      .then((res: StarRequestCountDTO) => {
        this.requestCount = res;
        console.log(this.requestCount);
      })
  };

  async getAllUser() {
    await firstValueFrom(this.starManagementService.getStarRequest())
      .then((res: UserStarConfigurationDTO[]) => {
        this.userdetails = res;
        this.InitialLoad = res;
      })
  };

  async updateStarRequest(user: UserStarConfigurationDTO, status) {

    let updateStarRequest = new UpdateStarRequestDTO();

    updateStarRequest.userStarId = user.userStarId;
    updateStarRequest.corpUserId = user.corpUserId;
    updateStarRequest.employeeName = user.employeeName;
    updateStarRequest.status = status == "2" ? "A" : "D";
    updateStarRequest.approvedby = this.currentUser.corpUserId.toString();
    updateStarRequest.message = user.message;
    updateStarRequest.modifiedBy = this.currentUser.corpUserId.toString();
    updateStarRequest.feedback = "";

    await firstValueFrom(this.starManagementService.updateStarRequest(updateStarRequest.userStarId, updateStarRequest));
    window.location.reload();
  };

  getUser(event) {
    const type = event.target.id;

    const isChecked = event.target.checked;
    this.userdetails = this.InitialLoad;

    if (type == "pending") {
      this.chkPendingIsSelected = isChecked;
      this.chkAllIsSelected = false;
    }
    else if (type == "approved") {
      this.chkApprovedIsSelected = isChecked;
      this.chkAllIsSelected = false;
    }
    else if (type == "denied") {
      this.chkDeniedIsSelected = isChecked;
      this.chkAllIsSelected = false;
    }
    else {
      this.chkPendingIsSelected = isChecked;
      this.chkApprovedIsSelected = isChecked;
      this.chkDeniedIsSelected = isChecked;
      this.chkAllIsSelected = isChecked;
    }


    if (this.chkPendingIsSelected && this.chkApprovedIsSelected && this.chkDeniedIsSelected) {
      this.userdetails = this.InitialLoad;
      this.chkAllIsSelected = isChecked;
    }
    else if (this.chkPendingIsSelected && this.chkApprovedIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'P' || f.status == 'A');
    }
    else if (this.chkApprovedIsSelected && this.chkDeniedIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'A' || f.status == 'D');
    }
    else if (this.chkPendingIsSelected && this.chkDeniedIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'P' || f.status == 'D');
    }
    else if (this.chkDeniedIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'D');
    }
    else if (this.chkApprovedIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'A');
    }
    else if (this.chkPendingIsSelected) {
      this.userdetails = this.userdetails.filter(f => f.status == 'P');
    }
    else {
      this.userdetails = this.InitialLoad;
    }
  }

  getUserList() {
    this.userdetails = this.InitialLoad;
    if (this.searchText != '') {
      this.userdetails = this.userdetails.filter(f => f.employeeName.toLocaleLowerCase().includes(this.searchText) || f.corpUserId.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }
    else {
      this.userdetails = this.InitialLoad;
    }
  }

  openDenyDialog(user) {
    // const dialogRef = this.dialog.open(DenyModalComponent, {
    //   data: {
    //     // message: 'Are you sure want to delete?',
    //     // buttonText: {
    //     //   ok: 'Yes',
    //     //   cancel: 'No'
    //     // }
    //   }
    // });

    // this.showMessage = false;
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = "some data";
    dialogConfig.height = 'auto';
    // dialogConfig.width = '600px';
    dialogConfig.data = user;
    let dialogRef = this.dialog.open(DenyModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.getAllUser();
    });
  }
}
