import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApsCalculatorPageRoutingModule } from './aps-calculator-routing.module';

import { ApsCalculatorPage } from './aps-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApsCalculatorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApsCalculatorPage]
})
export class ApsCalculatorPageModule {}
