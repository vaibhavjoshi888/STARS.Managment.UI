import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/_services/message.service';
import { SignedInUserDTO } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: SignedInUserDTO;
  isloggedinuser: boolean;
  isadminUser: boolean;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageservice: MessageService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.isloggedinuser = this.messageservice!.currentuser == "";
    if (this.messageservice.userRoleId == "1" || this.messageservice.userRoleId == "2")
      this.isadminUser = true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }

  login() {

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  ngOnInit(): void {

  }

}
