import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  IsLoggined:boolean = true;
  errorResponse:string='';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      // private alertService: AlertService
  ) {
    this.IsLoggined=true;
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/welcomne';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      // if (this.loginForm.invalid) {
      //     return;
      // }

      let username = this.loginForm.get('username').value;
      let password = this.loginForm.get('password').value;
      this.loading = true;
      this.authenticationService.login(username, password)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate(['/welcome']);
                    window.location.reload();
                
              },
              error => {
                  // this.alertService.error(error);
                  this.errorResponse=error.error;
                  this.IsLoggined=false;
                  this.loading = false;
              });
  }
}