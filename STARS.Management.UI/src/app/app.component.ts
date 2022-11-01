import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignedInUserDTO } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { MessageService } from './_services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: SignedInUserDTO;
  isLoginPage: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private messageservice: MessageService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.messageservice.currentuser = this.currentUser.firstName;
    this.messageservice.userRoleId = this.currentUser.roleId;
    if(this.router.url == '/')
    this.isLoginPage =true;
    else if(this.router.url == '/welcome')
    this.isLoginPage =true;
  }

  userIsLogged() {
    return this.isLoginPage;
  }

}
