import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeProfilePageRoutingModule } from './change-profile-routing.module';

import { ChangeProfilePage } from './change-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeProfilePage]
})
export class ChangeProfilePageModule {}
