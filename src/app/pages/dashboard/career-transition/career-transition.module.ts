import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerTransitionPageRoutingModule } from './career-transition-routing.module';
import { SwiperModule } from 'swiper/angular';
import { CareerTransitionPage } from './career-transition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerTransitionPageRoutingModule,
    SwiperModule
  ],
  declarations: [CareerTransitionPage]
})
export class CareerTransitionPageModule {}
