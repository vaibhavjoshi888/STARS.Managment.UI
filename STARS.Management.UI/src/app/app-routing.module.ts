import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { SampleComponent } from './sample/sample.component';
import { SearchusermodalComponent } from './searchusermodal/searchusermodal.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'manageuser', component: ManageuserComponent },
  { path: 'searchuser', component: SearchusermodalComponent },
  { path: 'updateuser', component: UpdateuserComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
