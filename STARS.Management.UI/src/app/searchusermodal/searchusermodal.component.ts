import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-searchusermodal',
  templateUrl: './searchusermodal.component.html',
  styleUrls: ['./searchusermodal.component.css']
})
export class SearchusermodalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SearchusermodalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
