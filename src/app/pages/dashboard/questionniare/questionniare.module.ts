import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionniarePageRoutingModule } from './questionniare-routing.module';

import { QuestionniarePage } from './questionniare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionniarePageRoutingModule
  ],
  declarations: [QuestionniarePage]
})
export class QuestionniarePageModule {}
