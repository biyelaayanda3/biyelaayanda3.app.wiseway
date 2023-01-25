import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsPage,
    children: [
      {
        path: 'private-chat',
        loadChildren: () => import('./private-chat/private-chat.module').then( m => m.PrivateChatPageModule)
      },
      {
        path: 'group-chat',
        loadChildren: () => import('./group-chat/group-chat.module').then( m => m.GroupChatPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tabs/chats/private-chat',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tabs/chats/private-chat',
    pathMatch: 'full'
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule {}
