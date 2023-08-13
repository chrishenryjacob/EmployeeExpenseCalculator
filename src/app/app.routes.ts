import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'page/employee', pathMatch: 'full'
                // title: 'Home',
                // loadComponent: () => import('./home/home.component')
                //     .then((c) => c.HomeComponent)
            },
            {
                path: 'page',
                loadChildren: () => import('./pages/page.routes')
                    .then((r) => r.pageRoutes)
            }
        ]
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./auth/not-found/not-found.component')
            .then((c) => c.NotFoundComponent)
    }
];
