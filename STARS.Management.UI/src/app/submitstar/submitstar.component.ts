import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { FindPersonModalComponent } from '../find-person-modal/find-person-modal.component';
import { UserDTO, UserStarConfigurationDTO } from '../_models/user';
import { StarManagementService } from '../_services/star-management.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-submitstar',
  templateUrl: './submitstar.component.html',
  styleUrls: ['./submitstar.component.css']
})
export class SubmitstarComponent implements OnInit {

  selectedUser: UserDTO;
  message: string = "";
  currentUser: any;
  showMessage: boolean = false;
  @ViewChild('findPerson', {static: true}) findPerson: ElementRef;

  constructor(public dialog: MatDialog, private starManagementService: StarManagementService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngAfterViewInit() {
    if(this.findPerson.nativeElement)
    {
    this.findPerson.nativeElement.click();
    console.log(this.findPerson.nativeElement); 
    }
  }

  ngAfterContentInit() {
    if(this.findPerson.nativeElement)
    {
    this.findPerson.nativeElement.click();
    console.log(this.findPerson.nativeElement); 
    }
  }

  openDialog() {
    this.showMessage = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';
    let dialogRef = this.dialog.open(FindPersonModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      // this.isNewUser = true;
      this.selectedUser = value;
    });
  }


  async submitStarRequest() {
    let userStarConfigurationDTO = new UserStarConfigurationDTO();
    userStarConfigurationDTO.corpUserId = this.selectedUser.corpID;
    userStarConfigurationDTO.employeeName = this.selectedUser.displayName;
    userStarConfigurationDTO.message = this.message;
    userStarConfigurationDTO.createdBy =  this.currentUser.corpID.toString();
    await firstValueFrom(this.starManagementService.submitStarRequest(userStarConfigurationDTO))
    // .then((res) => {
    //   this.showMessage = true;
    // });
  }
}
