import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerTipsPage } from './career-tips.page';

const routes: Routes = [
  {
    path: '',
    component: CareerTipsPage
  },
  {
    path: 'career-tips-students',
    loadChildren: () => import('./career-tips-students/career-tips-students.module').then( m => m.CareerTipsStudentsPageModule)
  },
  {
    path: 'career-tips-graduates',
    loadChildren: () => import('./career-tips-graduates/career-tips-graduates.module').then( m => m.CareerTipsGraduatesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerTipsPageRoutingModule {}
