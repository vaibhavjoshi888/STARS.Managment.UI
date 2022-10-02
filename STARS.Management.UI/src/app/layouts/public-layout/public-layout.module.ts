import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';


@NgModule({
  declarations: [
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    PublicLayoutRoutingModule
  ]
})
export class PublicLayoutModule { }
