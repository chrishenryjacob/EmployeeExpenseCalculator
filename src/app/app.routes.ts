import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
    },
    { path: '**', redirectTo: '/not-found' },
];
