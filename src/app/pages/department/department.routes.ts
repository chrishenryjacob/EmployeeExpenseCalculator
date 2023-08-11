import { Routes } from "@angular/router";

export const departmentRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./department.component')
            .then((c) => c.DepartmentComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./department-form/department-form.component')
            .then(c => c.DepartmentFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./department-form/department-form.component')
            .then(c => c.DepartmentFormComponent)
    }
]