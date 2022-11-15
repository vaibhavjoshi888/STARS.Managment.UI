import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isLoginPage: boolean = false;
  constructor(private router: Router, private messageservice: MessageService) {

  }

  ngOnInit(): void {
    this.messageservice.currentuser == null;
    
    if (this.router.url == '/welcome' || this.messageservice.currentuser == null)
      this.isLoginPage = false;
    else if (this.router.url == '/welcomesignout' || this.messageservice.currentuser == null)
      this.isLoginPage = false;
    else if (this.router.url == '/welcome' || this.messageservice.currentuser != null)
      this.isLoginPage = true;
    else if (this.router.url == '/')
      this.isLoginPage = true;
    else if (this.router.url == '/welcomesignin')
      this.isLoginPage = true;
  }

  login() {
    this.router.navigate(['/login']);
  }
  isUserLogged() {

    if (!this.messageservice.currentuser == null)
      this.router.navigate(['/submitstar']);
    else
      this.router.navigate(['/login']);
  }
  userIsLogged() {
    return this.isLoginPage;
  }
}
