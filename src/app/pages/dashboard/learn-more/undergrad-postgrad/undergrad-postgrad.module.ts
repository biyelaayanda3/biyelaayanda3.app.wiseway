import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UndergradPostgradPageRoutingModule } from './undergrad-postgrad-routing.module';

import { UndergradPostgradPage } from './undergrad-postgrad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UndergradPostgradPageRoutingModule
  ],
  declarations: [UndergradPostgradPage]
})
export class UndergradPostgradPageModule {}
