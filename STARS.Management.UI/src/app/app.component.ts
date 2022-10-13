import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  returnUrl: any;
  isLoginPage:boolean;
  href: string;

//this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.isLoginPage=this.router.url=='/' || this.router.url.includes('welcome') ;
  }
}
