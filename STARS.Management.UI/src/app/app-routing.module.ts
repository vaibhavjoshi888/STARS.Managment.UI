import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { ErrorPageComponent } from './layouts/error-page/error-page.component';
import { NotFoundPageComponent } from './layouts/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthLoginComponent  },
  // { path: '', pathMatch: 'full', redirectTo: 'home' },
  // { path: '', loadChildren: () => import('./layouts/public-layout/public-layout.module').then(m => m.PublicLayoutModule) },
  // { path: 'error', pathMatch: 'full', component: ErrorPageComponent },
  // { path: '**', pathMatch: 'full', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }

export const routableComponents = [
  ErrorPageComponent,
  NotFoundPageComponent,
];