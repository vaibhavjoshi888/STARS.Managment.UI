import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from '../_models/user';
import { UserManagementService } from '../_services/user-management.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  private formBuilder: FormBuilder;
  constructor(private userManagementService : UserManagementService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  async saveUser() {

    let user = {
    CorpID :"ShriantTest",
    Email :"ShriantTest",
    Phone :"ShriantTest",
    FullName :"ShriantTest",
    DisplayName :"ShriantTest",
    GivenName :"ShriantTest",
    Surname :"ShriantTest",
    SamaAccountName :"ShriantTest",
    PhysicalDeliveryOfficeName :"ShriantTest",
    EmployeeType :"ShriantTest",
    EmployeeId :"ShriantTest",
    EmployeeNumber :"ShriantTest",
    Title :"ShriantTest",
    Department :"ShriantTest",
    Division :"ShriantTest",
    Manager :"ShriantTest",
    ManagerDisplayName :"ShriantTest",
    ManagerEmail :"ShriantTest",
    ManagerCorpID :"ShriantTest",
    ThumbnailPhoto :"ShriantTest",
    UserRoleId :1
    }
    
    this.userManagementService.saveUserDetails(user)
    .subscribe(
        data => {
          this.router.navigate(['/manageuser']);
        },
        error => {
            // this.alertService.error(error);
           console.log(error);
        });    
    };

}
