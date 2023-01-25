import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MorePage,
    children: [
      {
        path: 'wiseway',
        loadChildren: () => import('./wiseway/wiseway.module').then( m => m.WisewayPageModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
      },
      {
        path: 'developers',
        loadChildren: () => import('./developers/developers.module').then( m => m.DevelopersPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tabs/more/tabs/wiseway',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tabs/more/tabs/wiseway',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
