import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnersPage } from './learners.page';

const routes: Routes = [
  {
    path: '',
    component: LearnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnersPageRoutingModule {}
