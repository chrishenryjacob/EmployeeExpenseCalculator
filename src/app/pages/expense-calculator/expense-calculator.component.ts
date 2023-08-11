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
  }

  onManagerChange(data: any) {
    this.hierarchyData = this.selectedManager;
    this.totalExpense = data ? this.calculateAllocations(data) : 0;
  }

  onDepartmentChange(data: any) {
    this.hierarchyData = this.selectedDepartment;
    this.totalExpense = data ? this.calculateAllocations(data, 'Department') : 0;
  }

  calculateAllocations(data: any, type: string = ''): number {
    let expense = 0;
    let result = undefined;

    if (type === 'Department') {
      result = data.members;
    }
    else{
      expense = data.allocation;
      result = data.subordinates;
    }

    for (const item of result || []) {
      expense += this.calculateAllocations(item);
    }

    return expense;
  }
}
