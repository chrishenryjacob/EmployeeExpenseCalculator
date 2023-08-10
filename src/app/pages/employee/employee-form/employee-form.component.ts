import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { EmployeeService } from '@shared/services/employee/employee.service';

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
    name: [null, [Validators.required]],
    type: [null, [Validators.required]]
  });
  service = inject(EmployeeService);
  action: number = 0;

  constructor(
    private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formData }) => formData && this.processFormData(formData));
  }

  private processFormData(formData: any) {
    this.action = formData ? 1 : 0;
    this.employeeForm.patchValue(formData);
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      this.action === 0 ? this.createCountry() : this.updateCountry();
    } else {
      Object.values(this.employeeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createCountry() {
    this.service.createEmployee(this.employeeForm.getRawValue()).subscribe(res => {

    })
  }

  updateCountry() {
    this.service.updateEmployee(this.employeeForm.getRawValue()).subscribe(res => {

    })
  }
}
