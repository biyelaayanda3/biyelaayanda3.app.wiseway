import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerTransitionItemPageRoutingModule } from './career-transition-item-routing.module';

import { CareerTransitionItemPage } from './career-transition-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerTransitionItemPageRoutingModule
  ],
  declarations: [CareerTransitionItemPage]
})
export class CareerTransitionItemPageModule {}
