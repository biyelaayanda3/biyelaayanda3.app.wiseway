import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerTipsGraduatesPageRoutingModule } from './career-tips-graduates-routing.module';

import { CareerTipsGraduatesPage } from './career-tips-graduates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerTipsGraduatesPageRoutingModule
  ],
  declarations: [CareerTipsGraduatesPage]
})
export class CareerTipsGraduatesPageModule {}
