import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerTipsGraduatesPage } from './career-tips-graduates.page';

const routes: Routes = [
  {
    path: '',
    component: CareerTipsGraduatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerTipsGraduatesPageRoutingModule {}
