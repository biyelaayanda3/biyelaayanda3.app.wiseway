import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaturalSciencePage } from './natural-science.page';

const routes: Routes = [
  {
    path: '',
    component: NaturalSciencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaturalSciencePageRoutingModule {}
