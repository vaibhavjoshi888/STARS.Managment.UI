import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';

const routes: Routes = [
  {
      path: 'auth', component: PublicLayoutComponent,
      loadChildren: () => import('./../../auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }

export const routedComponents = [
  PublicLayoutComponent
];
