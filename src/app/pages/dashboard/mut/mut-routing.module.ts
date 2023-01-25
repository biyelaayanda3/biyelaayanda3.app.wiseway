import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutPage } from './mut.page';

const routes: Routes = [
  {
    path: '',
    component: MutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutPageRoutingModule {}
