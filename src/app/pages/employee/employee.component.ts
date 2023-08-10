import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { Employee } from '@shared/models/employee.model';
import { EmployeeService } from '@shared/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    NzCardModule, NzTableModule, NzDividerModule, NzButtonModule, NzIconModule, NzPopconfirmModule
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  service = inject(EmployeeService)
  employeeList: Employee[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.service.read().subscribe(res => this.employeeList = res);
  }

  onEdit(data: any) {
    this.router.navigate(['./edit', data.id], { relativeTo: this.activatedRoute });
  }

  onDelete(data: any) {
    this.service.delete(data.id).subscribe((res: any) => {
      this.employeeList = this.employeeList.filter(item => item.id != data.id);
    });
  }
}
