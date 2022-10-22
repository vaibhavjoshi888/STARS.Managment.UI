import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SampleComponent } from './sample/sample.component';
import { SearchusermodalComponent } from './searchusermodal/searchusermodal.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    WelcomeComponent,
    SampleComponent,
    SearchusermodalComponent,
    ManageuserComponent,
    UpdateuserComponent
  ],
  imports: [
    BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        SharedModule,
        RouterModule,
        BrowserAnimationsModule,
        MatDialogModule
  ],
  exports:[SharedModule,RouterModule],

  providers: [],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
