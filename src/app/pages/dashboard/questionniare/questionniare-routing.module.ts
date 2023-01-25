import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionniarePage } from './questionniare.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionniarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionniarePageRoutingModule {}
