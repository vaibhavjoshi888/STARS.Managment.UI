import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitstarComponent } from './submitstar/submitstar.component';
import { ReviewstarsComponent } from './reviewstars/reviewstars.component';
import { ViewallstarsComponent } from './viewallstars/viewallstars.component';
import { FindPersonModalComponent } from './find-person-modal/find-person-modal.component';
import { DenyModalComponent } from './deny-modal/deny-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    WelcomeComponent,
    SampleComponent,
    SearchusermodalComponent,
    ManageuserComponent,
    UpdateuserComponent,
    SubmitstarComponent,
    ReviewstarsComponent,
    ViewallstarsComponent,
    FindPersonModalComponent,
    DenyModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    appRoutingModule,
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [SharedModule, RouterModule],

  providers: [],
  entryComponents: [MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
