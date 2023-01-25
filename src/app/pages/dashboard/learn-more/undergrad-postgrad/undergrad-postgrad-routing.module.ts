import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UndergradPostgradPage } from './undergrad-postgrad.page';

const routes: Routes = [
  {
    path: '',
    component: UndergradPostgradPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UndergradPostgradPageRoutingModule {}
