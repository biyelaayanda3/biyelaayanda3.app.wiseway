import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerTransitionPage } from './career-transition.page';

const routes: Routes = [
  {
    path: '',
    component: CareerTransitionPage
  },
  // {
  //   path: ':careerTransitionId',
  //   loadChildren: () => import('./career-transition-item/career-transition-item.module').then( m => m.CareerTransitionItemPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerTransitionPageRoutingModule {}
