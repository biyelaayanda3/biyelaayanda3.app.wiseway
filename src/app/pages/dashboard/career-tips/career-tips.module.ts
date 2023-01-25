import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerTipsPageRoutingModule } from './career-tips-routing.module';

import { CareerTipsPage } from './career-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerTipsPageRoutingModule
  ],
  declarations: [CareerTipsPage]
})
export class CareerTipsPageModule {}
