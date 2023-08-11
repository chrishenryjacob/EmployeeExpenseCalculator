import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '@shared/services/employee/employee.service';
import { Employee } from '@shared/models/employee.model';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-expense-calculator',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    NzCardModule, NzButtonModule, NzSelectModule,NzFormModule
  ],
  templateUrl: './expense-calculator.component.html',
  styleUrls: ['./expense-calculator.component.scss']
})
export class ExpenseCalculatorComponent implements OnInit {
  employeeService = inject(EmployeeService);

  employeeList: Employee[] = [];
  selectedData: any[] = [];

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.read().subscribe(res =>
      this.employeeList = res.filter(item => item.type === 'Manager'));
  }

}
