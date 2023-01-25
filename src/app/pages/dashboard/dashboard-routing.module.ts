import { DashboardPageModule } from './dashboard.module';
/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'questionniare',
        loadChildren: () => import('./questionniare/questionniare.module').then( m => m.QuestionniarePageModule)
      },
      {
        path: 'mut',
        loadChildren: () => import('./mut/mut.module').then( m => m.MutPageModule)
      },
      {
        path: 'interview',
        loadChildren: () => import('./interview/interview.module').then( m => m.InterviewPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
      },
      {
        path: 'career-transition',
        // loadChildren: () => import('./career-transition/career-transition.module').then( m => m.CareerTransitionPageModule)
        children: [
          {
            path: '',
            loadChildren: () => import('./career-transition/career-transition.module').then( m => m.CareerTransitionPageModule)
          },
          {
            path: ':careerTransitionId',
            loadChildren: () => import('../dashboard/career-transition/career-transition-item/career-transition-item.module').then( m => m.CareerTransitionItemPageModule)
          }
        ],

      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
          },
          {
            path: 'engineering',
            loadChildren: () => import('../dashboard/courses/mut-faculties/engineering/engineering.module').then( m => m.EngineeringPageModule)
          },
          {
            path: 'management',
            loadChildren: () => import('../dashboard/courses/mut-faculties/management/management.module').then( m => m.ManagementPageModule)
          },
          {
            path: 'natural-science',
            loadChildren: () => import('../dashboard/courses/mut-faculties/natural-science/natural-science.module').then( m => m.NaturalSciencePageModule)
          },
        ],

      },
      {
        path: 'career-tips',
        loadChildren: () => import('./career-tips/career-tips.module').then( m => m.CareerTipsPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'aps-calculator',
    loadChildren: () => import('./aps-calculator/aps-calculator.module').then( m => m.ApsCalculatorPageModule)
  },
  {
    path: 'graduates',
    loadChildren: () => import('./learn-more/graduates/graduates.module').then( m => m.GraduatesPageModule)
  },
  {
    path: 'fundamentals',
    loadChildren: () => import('./learn-more/fundamentals/fundamentals.module').then( m => m.FundamentalsPageModule)
  },
  {
    path: 'learners',
    loadChildren: () => import('./learn-more/learners/learners.module').then( m => m.LearnersPageModule)
  },
  {
    path: 'parents',
    loadChildren: () => import('./learn-more/parents/parents.module').then( m => m.ParentsPageModule)
  },
  {
    path: 'psychometric',
    loadChildren: () => import('./learn-more/psychometric/psychometric.module').then( m => m.PsychometricPageModule)
  },
  {
    path: 'undergrad-postgrad',
    loadChildren: () => import('./learn-more/undergrad-postgrad/undergrad-postgrad.module').then( m => m.UndergradPostgradPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
