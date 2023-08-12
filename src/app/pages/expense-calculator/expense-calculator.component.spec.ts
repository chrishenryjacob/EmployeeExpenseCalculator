import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ExpenseCalculatorComponent } from './expense-calculator.component';

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

  it('should calculate correct expense for department', () => {
    const data = ManagerData;
    const type = 'Manager';
    const result = component.calculateAllocations(data, type);
    expect(result).toBe(3100);
  });
});

const ManagerData = {
  name: 'Project Manager',
  type: 'Manager',
  allocation: 300,
  subordinates: [
    {
      name: 'Dev Manager',
      type: 'Manager',
      allocation: 300,
      subordinates: [
        {
          name: 'Developer 1',
          type: 'Developer',
          allocation: 1000
        },
        {
          name: 'Developer 2',
          type: 'Developer',
          allocation: 1000
        }
      ]
    },
    {
      name: 'QA 1',
      type: 'QA Tester',
      allocation: 500
    }
  ]
};