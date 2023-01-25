import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WisewayPage } from './wiseway.page';

const routes: Routes = [
  {
    path: '',
    component: WisewayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WisewayPageRoutingModule {}
