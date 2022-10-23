
import { Component, Input, OnInit } from '@angular/core';
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
  userDTO: UserDTO;
  @Input() selectedUser : UserDTO;
  roleOptions: { id: number; value: string; }[];
  selectedOption: number;


  constructor(private userManagementService: UserManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {

   this.roleOptions = [
    { id: 1, value: "Site Admin" },
    { id: 2, value: "Super Admin" }
  ]

    this.userDTO = this.selectedUser;
  }

  async saveUser() {

    this.userDTO.userRoleId = this.selectedOption;

    this.userManagementService.saveUserDetails(this.userDTO)
      .subscribe(
        data => {
          this.router.navigate(['/manageuser']);
        },
        error => {
          // this.alertService.error(error);
          console.log(error);
        });
  }

  cancel(){
    this.router.navigate(['/manageuser']);
  }

}
