import { Routes } from "@angular/router";

export const employeeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./employee.component')
            .then((c) => c.EmployeeComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./employee-form/employee-form.component')
            .then(c => c.EmployeeFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./employee-form/employee-form.component')
            .then(c => c.EmployeeFormComponent)
    }
]