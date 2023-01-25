import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MutPageRoutingModule } from './mut-routing.module';

import { MutPage } from './mut.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MutPageRoutingModule
  ],
  declarations: [MutPage]
})
export class MutPageModule {}
