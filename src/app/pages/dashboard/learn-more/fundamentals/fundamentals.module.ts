import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundamentalsPageRoutingModule } from './fundamentals-routing.module';

import { FundamentalsPage } from './fundamentals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundamentalsPageRoutingModule
  ],
  declarations: [FundamentalsPage]
})
export class FundamentalsPageModule {}
