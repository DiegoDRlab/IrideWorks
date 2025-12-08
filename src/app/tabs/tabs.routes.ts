import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../onGoing/ongoing.page').then((m) => m.OngoingPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../incoming/incoming.page').then((m) => m.IncomingPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../completed/completed.page').then((m) => m.CompletedPage),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../add/add.page').then((m) => m.AddPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
