import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'add',
    loadComponent: () => import('./add/add.page').then( m => m.AddPage)
  },
  {
    path: 'worksite-details',
    loadComponent: () => import('./worksite-details/worksite-details.page').then( m => m.WorksiteDetailsPage)
  },
];
