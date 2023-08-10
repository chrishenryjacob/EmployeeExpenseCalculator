import { Routes } from "@angular/router";

export const pageRoutes: Routes = [
    {
        path: 'employee',
        title: 'Employee',
        loadChildren: () => import('./employee/employee.routes')
            .then(r => r.employeeRoutes)
    }
]