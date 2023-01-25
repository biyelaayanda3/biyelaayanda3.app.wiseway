import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychometricPageRoutingModule } from './psychometric-routing.module';

import { PsychometricPage } from './psychometric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychometricPageRoutingModule
  ],
  declarations: [PsychometricPage]
})
export class PsychometricPageModule {}
