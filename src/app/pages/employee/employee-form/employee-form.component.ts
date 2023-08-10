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

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    NzCardModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm = this.fb.nonNullable.group({
    id: [crypto.randomUUID(), Validators.required],
    name: [null, [Validators.required]],
    type: [null, [Validators.required]],
    allocation: [{ value: 0, disabled: true }, Validators.required]
  });
  employeeTypes: EmployeeType[] = EmployeeTypeList;
  service = inject(EmployeeService);
  action: number = 0;
  navigateUrl: string = '/page/employee';

  constructor(
    private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formData }) => formData && this.processFormData(formData));
  }

  private processFormData(formData: any) {
    this.action = formData ? 1 : 0;
    this.employeeForm.patchValue(formData);
  }

  onEmployeeTypeChange(type: any) {
    const employeeType = this.employeeTypes.find(item => item.name === type);
    this.employeeForm.get('allocation')?.setValue(employeeType?.allocation ?? 0);
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      this.action === 0 ? this.createEmployee() : this.updateEmployee();
    } else {
      Object.values(this.employeeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
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
}
