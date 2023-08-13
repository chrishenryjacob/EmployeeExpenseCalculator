import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { DepartmentDependencyData, EmployeeDependencyData } from '@shared/mocks/dependencyData';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove employeeId from refs and children in EmployeeDetails', () => {
    const data = EmployeeDependencyData;
    spyOn(service, 'fetchFromLocalStorage').and.returnValues(data, []);
    spyOn(localStorage, 'setItem');
    service.deleteDependencies('id123');
    expect(data[0].children).toEqual(['child2']);
    expect(data[1].refs).toEqual([]);
  });

  it('should remove employeeId from children in DepartmentDetails', () => {
    const data = DepartmentDependencyData;
    spyOn(service, 'fetchFromLocalStorage').and.returnValues(data, []);
    spyOn(localStorage, 'setItem');
    service.deleteDependencies('id123');
    expect(data[0].children).toEqual(['child2', 'child3']);
  });

});
