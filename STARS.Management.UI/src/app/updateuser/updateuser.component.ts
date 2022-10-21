
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
  private userDTO: UserDTO;
  constructor(private userManagementService: UserManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  async saveUser() {

    this.userDTO = new UserDTO();
    this.userDTO.corpID = "Vaibhav";
    this.userDTO.email = "ShriantTest";
    this.userDTO.phone = "ShriantTest";
    this.userDTO.fullName = "vaibhav joshi";
    this.userDTO.displayName = "ShriantTest";
    this.userDTO.givenName = "ShriantTest";
    this.userDTO.surname = "ShriantTest";
    this.userDTO.samaAccountName = "ShriantTest";
    this.userDTO.physicalDeliveryOfficeName = "ShriantTest";
    this.userDTO.employeeType = "ShriantTest";
    this.userDTO.employeeId = "ShriantTest";
    this.userDTO.employeeNumber = "ShriantTest";
    this.userDTO.title = "ShriantTest";
    this.userDTO.department = "ShriantTest";
    this.userDTO.division = "ShriantTest";
    this.userDTO.manager = "ShriantTest";
    this.userDTO.managerDisplayName = "ShriantTest";
    this.userDTO.managerEmail = "ShriantTest";
    this.userDTO.managerCorpID = "ShriantTest";
    this.userDTO.thumbnailPhoto = "ShriantTest";
    this.userDTO.userRoleId = 1

    this.userManagementService.saveUserDetails(this.userDTO)
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
