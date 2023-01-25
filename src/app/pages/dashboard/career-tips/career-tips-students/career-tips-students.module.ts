import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerTipsStudentsPageRoutingModule } from './career-tips-students-routing.module';

import { CareerTipsStudentsPage } from './career-tips-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerTipsStudentsPageRoutingModule
  ],
  declarations: [CareerTipsStudentsPage]
})
export class CareerTipsStudentsPageModule {}
