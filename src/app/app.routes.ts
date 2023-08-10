import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./pages/not-found/not-found.component')
            .then((c) => c.NotFoundComponent)
    },
];
