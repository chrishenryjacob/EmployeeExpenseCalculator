import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { DepartmentService } from '@shared/services/department/department.service';
import { Department } from '@shared/models/department.model';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    NzCardModule, NzTableModule, NzDividerModule, NzButtonModule, NzIconModule, NzPopconfirmModule
  ],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  service = inject(DepartmentService)
  departmentList: Department[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.service.read().subscribe(res => this.departmentList = res);
  }

  onEdit(data: any) {
    this.router.navigate(['./edit', data.id], { relativeTo: this.activatedRoute });
  }

  onDelete(data: any) {
    this.service.delete(data.id).subscribe((res: any) => {
      this.departmentList = this.departmentList.filter(item => item.id != data.id);
    });
  }
}
