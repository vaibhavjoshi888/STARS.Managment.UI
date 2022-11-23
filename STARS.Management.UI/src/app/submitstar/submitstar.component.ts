import { ApplicationRef, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, finalize, firstValueFrom } from 'rxjs';
import { FindPersonModalComponent } from '../find-person-modal/find-person-modal.component';
import { UserDTO, UserStarConfigurationDTO } from '../_models/user';
import { StarManagementService } from '../_services/star-management.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submitstar',
  templateUrl: './submitstar.component.html',
  styleUrls: ['./submitstar.component.css']
})
export class SubmitstarComponent implements OnInit {

  selectedUser: any;
  message: string = "";
  currentUser: any;
  showMessage: boolean = false;
  defaultPersonIcon: string;
  @ViewChild('findPerson', { static: true }) findPerson: ElementRef;
  value: any;

  constructor(public dialog: MatDialog, private starManagementService: StarManagementService,
    private authenticationService: AuthenticationService, private cd: ChangeDetectorRef, private applicationRef: ApplicationRef,
    private zone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.defaultPersonIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEX///+hoaGenp6jo6P8/PyoqKj6+vry8vKrq6vb29vo6Oj39/f19fXe3t7u7u6lpaXU1NS5ubnNzc2zs7PCwsLPz8+8vLzBwcHc3NzSqVlFAAAGJ0lEQVR4nO2d25arIAyGR0TB87nO+z/pxnZ2x9qDBxISZ/Hd9a7/iiQhhPD15fF4PB6Px+PxeDwej8fj8Xg8Ho/H4/F4PB6Px+PxeDzwZGVaFPWVokjLjPr/gBKXSds3ndZRFRoqrXXX9G1SSup/BkJWtJ2uwkCIYIb5YZQ2Q3p6W6Z9FAYfCHWfUv9HC/JBP1ruFULo+pyGlOlYrcr70Rj151uSUvXhNn03kVGrzqVR1d0OfVeaWlH/6+3ERRPsFRiI8FKcxYyqjfbKu6Hbc7ictPkYHz6bsaT+9xtIDhrwRlRQ//9Vht0L8NGMVU2t4DPxaCdwouXsb9Rorc8kcn1OreMt6mJvwYmRq8S8B9FnYBo1svZolHgiHDiuRTlUUAKDgKVHTQAFmqDBLy6qCMbL/JcYxdSKluzeS6xJvFArWtADCzQM1JoeSMH1mRSVUwEnbxAUBhdGUbEGi4RzooRa152ywxBojMilrhHDJTOPsEltUg3vSK+IjseWP25x9E3ULIyoGiQTTmGfxT6qxtJnCDmkp4gmNEYcGaSnqVVtbQ1N72tki2hCY0T6jWIOvalYKGzIvWmJFO3/U5HnNTWqCY0RyZNToALie4UjscAM1ZNORMQKU2QTGiMSxwvsZWgUEqc1CPWZpULiiIi0950rJHY16I7GbBJJBWbI8X5Ck2Y1JfoypM5q8IOF2SOShgsnCkkrw4VX6BV6heQK/76n+fvRQjlQGJFGfAnZnvCGjrYW9eczb/AGhRcKiXdPuPXgq0LiYluCr5C4YcFBJYq4JBxrbIWaVuDXF0BT8EdET60QeyFSL0MHJzPkbUMZ5hHwdJJPfromcave1NFwokT1ph2DZowMs7AvWFy+KBCzbx4dmJgdQyO5J52QA5bAoGLgZyZKrC2UaMjbFH6okXb6fFpoY5QmaJOScnCkN3DcqWbhSG9IsDtdM8KWWtYchdAmzCGdmQG/iWJ38wk6d6NuwXgmh81sGPQkPgHasS86LrF+TgF3P09wChS/SLiWdhYN7K+Ayt7YudE7cQsiMeJxj+QlsgZI3zSbfPslia1HFR3bT/SHwk6i6Fh60QdSm85vMXKMg0tUu3HG17O+6iRzzeTBL9V8oXyd6IK8X59E96QvZDrv4w1lv/PEpmrPsAJ/kfHeK23NqSbSZWnd7M1uQt0XZxGpvvsNAyGfEWEzpAwuVK6hkmbPwMRHjUK33N2pMp+nZU7DWmNuq+8K45mtRQezPzROh2VkVCPg6UXHbwclh/3zPD8hGvpL3HNkCn5KKkJOWXhWAziYZ0YuXlXuzkE3IrqERQIgC7Q7iCJqGZzOxDXWdJqJ8EIeG7MeZQn+Ql2YynDOt2cQzxdU+I3s5kslPGdDGxC1gKz1K8W/yH0jJJJoWfvdRUsRGF0KDASBRFdr8C7R9YeK1sv2jtDxsE+M/pk1nErMCAQ67T+Rrj/RG+5O91G62LbgrCcaa5jnOo5mYdo9YGGHk77vlGYR3qgczGzNIR54OIzQ6N5GDmSL8CYRfSliXh/ZRo+boSLPgdwC8l0v/Kvb61SY9TcXo0xWwRxBQJKOPoP4nXL4RifQZoHgTgzeA9J2OL5QC7uD9HZZ4WBSy1ZQhmDjvGFxkOgbQSFxurYA4YjYeenpM/ClfsSrsIeAz8CZmXCqS8FGDGn5cCM80EZkZ0JoIyIPvziEAL2BiTzA5BigY7ALajWvgHyZTXI0Iej4IRfzkA8AOEIKf/D6QaDqw5JVRjoD7DTqm6sJBdRYTJ5+ZgJoPG3JaOe7BGawBLNdxQMgeY3ktLdfAlKwSdFnP1oAMv+EV/ViAcTsBaT5QVAAnCc6a887BsBnCvrcNjz2b0CSdZZsxfp2O+r7jRBYD61jHSuu2PZlJpxjxYSwfBY5Zrs1vGM5rEdhP/5nj2U/H/9laLsN5nRm+Aa7FnDA0U9o2I0ARZ0RDEVlc4DBPt5PWJVNSzbdFx+wOqJJucf7CWHTc8qiy2sNcTleGOZ4qPaC6PgGit/J70ssnoBEfjcdCot3Wk6Qd09YvImc8+i2XMPiMFidIVhY5d6K+r9vw0bhKT5SE/IPK2R6ur1EHK+Z4j85BsPHV5//AYAOcCVa7s0JAAAAAElFTkSuQmCC";
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngAfterViewInit() {
    if (this.findPerson.nativeElement) {
      this.findPerson.nativeElement.click();
      console.log(this.findPerson.nativeElement);
    }
  }

  ngAfterContentInit() {
    if (this.findPerson.nativeElement) {
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

    dialogRef.afterClosed().pipe(finalize(() => console.log("completed"))).subscribe(value => {
      this.selectedUser = null;
      this.selectedUser = value;
      console.log("after closed  " + this.selectedUser);
      this.cd.detectChanges();
      this.cd.markForCheck();
      this.applicationRef.tick();

      this.zone.run(() => { // <== added
        this.selectedUser = value;
        console.log("zone  " + this.selectedUser);
      });

    });
  }

  redirect(){
    this.router.navigate(['/welcomesignin']);
    window.location.reload();
  }

  async submitStarRequest() {
    let userStarConfigurationDTO = new UserStarConfigurationDTO();
    userStarConfigurationDTO.corpUserId = this.selectedUser.corpID;
    userStarConfigurationDTO.employeeName = this.selectedUser.displayName;
    userStarConfigurationDTO.message = this.message;
    userStarConfigurationDTO.createdBy = this.currentUser.corpUserId.toString();
    userStarConfigurationDTO.displayName = this.selectedUser.displayName;
    userStarConfigurationDTO.surname = this.selectedUser.surname;
    userStarConfigurationDTO.createdBy = this.currentUser.corpUserId.toString();
    await firstValueFrom(this.starManagementService.submitStarRequest(userStarConfigurationDTO))
  }
}
