import { Routes } from "@angular/router";

export const pageRoutes: Routes = [
    {
        path: 'employee',
        title: 'Employee',
        children: [
            {
                path: '',
                loadComponent: () => import('./employee/employee.component')
                    .then((c) => c.EmployeeComponent)
            },
            {
                path: 'add',
                loadComponent: () => import('./employee/employee-form/employee-form.component')
                    .then(c => c.EmployeeFormComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./employee/employee-form/employee-form.component')
                    .then(c => c.EmployeeFormComponent)
            }
        ]
    }
]