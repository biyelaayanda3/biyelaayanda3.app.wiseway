import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnersPageRoutingModule } from './learners-routing.module';

import { LearnersPage } from './learners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnersPageRoutingModule
  ],
  declarations: [LearnersPage]
})
export class LearnersPageModule {}
