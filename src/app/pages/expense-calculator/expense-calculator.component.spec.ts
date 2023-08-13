import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ExpenseCalculatorComponent } from './expense-calculator.component';
import { ManagerData } from '@shared/mocks/managerData';
import { DepartmentData } from '@shared/mocks/departmentData';

describe('ExpenseCalculatorComponent', () => {
  let component: ExpenseCalculatorComponent;
  let fixture: ComponentFixture<ExpenseCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ExpenseCalculatorComponent
      ]
    });
    fixture = TestBed.createComponent(ExpenseCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate correct expense for manager', () => {
    const data = ManagerData;
    const result = component.calculateAllocations(data, 'Manager');
    expect(result).toBe(4100);
  });

  it('should calculate correct expense for department', () => {
    const data = DepartmentData;
    const result = component.calculateAllocations(data, 'Department');
    expect(result).toBe(2300);
  });

});