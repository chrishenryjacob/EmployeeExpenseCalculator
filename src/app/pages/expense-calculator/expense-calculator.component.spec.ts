import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCalculatorComponent } from './expense-calculator.component';

describe('ExpenseCalculatorComponent', () => {
  let component: ExpenseCalculatorComponent;
  let fixture: ComponentFixture<ExpenseCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpenseCalculatorComponent]
    });
    fixture = TestBed.createComponent(ExpenseCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
