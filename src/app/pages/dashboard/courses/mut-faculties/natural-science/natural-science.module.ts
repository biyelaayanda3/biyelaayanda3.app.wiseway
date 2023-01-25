import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaturalSciencePageRoutingModule } from './natural-science-routing.module';

import { NaturalSciencePage } from './natural-science.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaturalSciencePageRoutingModule
  ],
  declarations: [NaturalSciencePage]
})
export class NaturalSciencePageModule {}
