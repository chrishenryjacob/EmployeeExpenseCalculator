import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { EmployeeData } from '@shared/mocks/employeeData';

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
    const data = EmployeeData;
    spyOn(service, 'fetchFromLocalStorage').and.returnValues(data, []);
    spyOn(localStorage, 'setItem');
    service.deleteDependencies('id123');
    expect(data[0].children).toEqual(['child2']);
    expect(data[1].refs).toEqual([]);
  });

});
