import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from '../_models/user';
import { UserManagementService } from '../_services/user-management.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchusermodalComponent } from '../searchusermodal/searchusermodal.component';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  // userdetails : any;
  userdetails : UserDTO[] = [];
  selectedUser : UserDTO;

  

  constructor(private userManagementService : UserManagementService,
    public dialog: MatDialog
    ) { }

  async ngOnInit() {
    await this.getAllUser();
  }

  ngOnChange(){

  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    let dialogRef = this.dialog.open(SearchusermodalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
      this.selectedUser = value;
    });
  }
  
  async getAllUser() {
    await firstValueFrom(this.userManagementService.getAllUsers())
    .then((res : UserDTO[]) => 
    this.userdetails = res
    )};
  
   async resetUser(event){
      if(event){
        this.selectedUser = null;
       await this.getAllUser();
      }
    }
}
