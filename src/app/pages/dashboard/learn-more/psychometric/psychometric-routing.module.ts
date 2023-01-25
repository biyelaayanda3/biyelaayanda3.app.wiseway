import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychometricPage } from './psychometric.page';

const routes: Routes = [
  {
    path: '',
    component: PsychometricPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychometricPageRoutingModule {}
