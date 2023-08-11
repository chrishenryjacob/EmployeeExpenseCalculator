import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '@shared/services/employee/employee.service';
import { Employee } from '@shared/models/employee.model';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-expense-calculator',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    NzCardModule, NzButtonModule, NzSelectModule, NzFormModule, NzStatisticModule
  ],
  templateUrl: './expense-calculator.component.html',
  styleUrls: ['./expense-calculator.component.scss']
})
export class ExpenseCalculatorComponent implements OnInit {
  employeeService = inject(EmployeeService);

  employeeList: Employee[] = [];
  selectedItem: any;
  totalExpense: number = 0;

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.readDetailed().subscribe(res =>
      this.employeeList = res.filter(item => item.type === 'Manager'));
  }

  onChange(data: any) {
    this.totalExpense = data ? this.calculateTotalAllocations(data) : 0;
  }

  calculateTotalAllocations(employee: any): number {
    let totalAllocation = employee.allocation;

    for (const subordinate of employee.subordinates || []) {
      totalAllocation += this.calculateTotalAllocations(subordinate);
    }

    return totalAllocation;
  }
}
