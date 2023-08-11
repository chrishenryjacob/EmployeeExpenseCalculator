import { Routes } from "@angular/router";

export const pageRoutes: Routes = [
    {
        path: 'employee',
        title: 'Employee',
        loadChildren: () => import('./employee/employee.routes')
            .then(r => r.employeeRoutes)
    },
    {
        path: 'department',
        title: 'Department',
        loadChildren: () => import('./department/department.routes')
            .then(r => r.departmentRoutes)
    },
    {
        path: 'expense-calculator',
        title: 'Expense Calculator',
        loadComponent: () => import('./expense-calculator/expense-calculator.component')
            .then((c) => c.ExpenseCalculatorComponent)
    }
]