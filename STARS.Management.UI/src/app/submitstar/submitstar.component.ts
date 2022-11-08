import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FindPersonModalComponent } from '../find-person-modal/find-person-modal.component';
import { UserDTO } from '../_models/user';

@Component({
  selector: 'app-submitstar',
  templateUrl: './submitstar.component.html',
  styleUrls: ['./submitstar.component.css']
})
export class SubmitstarComponent implements OnInit {

  selectedUser: UserDTO;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
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
}
