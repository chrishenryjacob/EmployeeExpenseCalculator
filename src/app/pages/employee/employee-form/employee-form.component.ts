import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { EmployeeService } from '@shared/services/employee/employee.service';
import { EmployeeType } from '@shared/models/employee-type.model';
import { EmployeeTypeList } from '@shared/constants/employee-type.data';
import { HierarchyComponent } from '@shared/components/hierarchy/hierarchy.component';
import { Employee } from '@shared/models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    HierarchyComponent,
    NzCardModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  service = inject(EmployeeService);

  employeeForm = this.fb.nonNullable.group({
    id: [crypto.randomUUID(), Validators.required],
    name: [null, [Validators.required]],
    type: [null, [Validators.required]],
    allocation: [{ value: 0, disabled: true }, Validators.required],
    subordinates: [[] as any]
  });

  employeeList: any[] = [];
  employeeTypes: EmployeeType[] = EmployeeTypeList;
  action: number = 0;
  navigateUrl: string = '/page/employee';

  constructor(
    private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.getEmployeeList();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formData }) => formData && this.processFormData(formData));
  }

  private getEmployeeList() {
    this.service.read().subscribe(res => this.employeeList = res)
  }

  private processFormData(formData: any) {
    this.action = formData ? 1 : 0;
    this.employeeForm.patchValue(formData);
  }

  onEmployeeTypeChange(type: any) {
    const employeeType = this.employeeTypes.find(item => item.name === type);
    this.employeeForm.get('allocation')?.setValue(employeeType?.allocation ?? 0);
  }

  onCancel() {
    this.router.navigate([this.navigateUrl]);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.action === 0 ? this.createEmployee() : this.updateEmployee();
    } else {
      this.markFormAsDirty();
    }
  }

  createEmployee() {
    this.service.create(this.employeeForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([this.navigateUrl]);
      }
    })
  }

  updateEmployee() {
    this.service.update(this.employeeForm.getRawValue()).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([this.navigateUrl]);
      }
    })
  }

  disableSubordinates(data: Employee[]) {
    const disableIds: string[] = data
      .filter(item => item.subordinates?.length! > 0)
      .flatMap(item => (item.subordinates || []).map(subordinate => subordinate.id));

    this.employeeList.forEach(item => {
      item.disabled = disableIds.includes(item.id);
    });
  }

  markFormAsDirty() {
    Object.values(this.employeeForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

}
