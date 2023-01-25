import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApsCalculatorPage } from './aps-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: ApsCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApsCalculatorPageRoutingModule {}
