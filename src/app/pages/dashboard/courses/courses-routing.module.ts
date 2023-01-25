import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPage } from './courses.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesPage
  },
  {
    path: 'engineering',
    loadChildren: () => import('./mut-faculties/engineering/engineering.module').then( m => m.EngineeringPageModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./mut-faculties/management/management.module').then( m => m.ManagementPageModule)
  },
  {
    path: 'natural-science',
    loadChildren: () => import('./mut-faculties/natural-science/natural-science.module').then( m => m.NaturalSciencePageModule)
  },
  {
    path: 'rules',
    loadChildren: () => import('./mut-faculties/rules/rules.module').then( m => m.RulesPageModule)
  },
  {
    path: 'courses-list',
    loadChildren: () => import('./more/courses-list/courses-list.module').then( m => m.CoursesListPageModule)
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./more/course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesPageRoutingModule {}
