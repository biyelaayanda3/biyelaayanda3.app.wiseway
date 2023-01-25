import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerTipsStudentsPage } from './career-tips-students.page';

const routes: Routes = [
  {
    path: '',
    component: CareerTipsStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerTipsStudentsPageRoutingModule {}
