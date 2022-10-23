import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ConfirmationDialog } from './alert/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MenuComponent,FooterComponent, ConfirmationDialog],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  exports:[
    MenuComponent,
    FooterComponent,
    RouterModule,
    ConfirmationDialog
  ]
})
export class SharedModule {}
