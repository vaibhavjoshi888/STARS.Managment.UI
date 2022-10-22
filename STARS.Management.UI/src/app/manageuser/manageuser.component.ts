import { Component, OnInit } from '@angular/core';
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
  constructor(private userManagementService : UserManagementService,
    public dialog: MatDialog
    ) { }

  async ngOnInit() {
    await this.getAllUser();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    let dialogRef = this.dialog.open(SearchusermodalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

  async getAllUser() {
    await firstValueFrom(this.userManagementService.getAllUsers())
    .then((res : UserDTO[]) => 
    this.userdetails = res
    )};
}
