import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentService } from '@shared/services/department/department.service';
import { EmployeeService } from '@shared/services/employee/employee.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    NzCardModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule
  ],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  service = inject(DepartmentService);
  employeeService = inject(EmployeeService);

  departmentForm = this.fb.nonNullable.group({
    id: [crypto.randomUUID(), Validators.required],
    name: [null, [Validators.required]],
    members: [[] as any]
  });

  employeeList: any[] = [];
  action: number = 0;
  navigateUrl: string = '/page/department';

  constructor(
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute
  ) {
    this.getEmployeeList();
  }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    if (formId) {
      this.getDepartmentDetails(formId);
    }
  }

  private getEmployeeList() {
    this.employeeService.read().subscribe(res => this.employeeList = res)
  }

  private getDepartmentDetails(id: string) {
    this.service.readById(id).subscribe(res => {
      this.action = 1;
      this.departmentForm.patchValue(res);
    })
  }

  onCancel() {
    this.router.navigate([this.navigateUrl]);
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.action === 0 ? this.createDepartment() : this.updateDepartment();
    } else {
      this.markFormAsDirty();
    }
  }

  createDepartment() {
    this.service.create(this.departmentForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([this.navigateUrl]);
      }
    })
  }

  updateDepartment() {
    this.service.update(this.departmentForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([this.navigateUrl]);
      }
    })
  }

  markFormAsDirty() {
    Object.values(this.departmentForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

}
