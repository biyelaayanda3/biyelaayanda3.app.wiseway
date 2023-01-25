import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerTransitionItemPage } from './career-transition-item.page';

const routes: Routes = [
  {
    path: '',
    component: CareerTransitionItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerTransitionItemPageRoutingModule {}
