import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WisewayPageRoutingModule } from './wiseway-routing.module';

import { WisewayPage } from './wiseway.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WisewayPageRoutingModule
  ],
  declarations: [WisewayPage]
})
export class WisewayPageModule {}
