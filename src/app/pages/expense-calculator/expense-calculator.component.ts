import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '@shared/services/employee/employee.service';
import { Employee } from '@shared/models/employee.model';
import { HierarchyComponent } from '@shared/components/hierarchy/hierarchy.component';
import { Department } from '@shared/models/department.model';
import { DepartmentService } from '@shared/services/department/department.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

@Component({
  selector: 'app-expense-calculator',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    HierarchyComponent,
    NzCardModule, NzButtonModule, NzSelectModule, NzFormModule, NzStatisticModule, NzTreeViewModule
  ],
  templateUrl: './expense-calculator.component.html',
  styleUrls: ['./expense-calculator.component.scss']
})
export class ExpenseCalculatorComponent implements OnInit {
  employeeService = inject(EmployeeService);
  departmenService = inject(DepartmentService);

  managerList: Employee[] = [];
  selectedManager: any;
  departmentList: Department[] = [];
  selectedDepartment: any;
  totalExpense: number = 0;
  type!: string;
  hierarchyData: any;

  ngOnInit(): void {
    this.getEmployeeList();
    this.getDepartmentList();
  }

  getEmployeeList() {
    this.employeeService.readDetailed().subscribe(res =>
      this.managerList = res.filter(item => item.type === 'Manager'));
  }

  getDepartmentList() {
    this.departmenService.readDetailed().subscribe(res => this.departmentList = res);
  }

  onTypeChange(data: any) {
    this.hierarchyData = null;
    this.selectedManager = null;
    this.selectedDepartment = null;
  }

  onManagerChange(data: any) {
    this.hierarchyData = this.selectedManager;
    this.totalExpense = data ? this.calculateAllocations(data, 'Manager') : 0;
  }

  onDepartmentChange(data: any) {
    this.hierarchyData = this.selectedDepartment;
    this.totalExpense = data ? this.calculateAllocations(data, 'Department') : 0;
  }

  /**
   * Calculates allocations(expense) recursively based on the provided data and type.
   * @param data The data containing allocation details.
   * @param type The type of allocation being calculated, mainly department and manager.
   * @param processedIds An array of processed IDs to avoid duplicate calculations (in case of department).
   * @returns The calculated allocation value as total expense.
   */
  calculateAllocations(data: any, type: string, processedIds: string[] = []): number {
    processedIds.push(data.id);
    let expense = data.allocation ?? 0;
    for (const item of data.children || []) {
      expense += type === 'Manager'
        ? this.calculateAllocations(item, type)
        : !processedIds.includes(item.id)
          ? this.calculateAllocations(item, type, processedIds) : 0;
    }

    return expense;
  }
}
