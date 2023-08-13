import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  helper = inject(HelperService);

  /**
  * Simulates an API call by storing data in local storage.
  * @param payload The data to be stored.
  */
  create(payload: any) {
    const employeeData = this.helper.fetchFromLocalStorage('EmployeeDetails');

    const hasDuplicate = employeeData.some((item: any) => item.name === payload.name);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate name' });
    }

    employeeData.push(payload);
    localStorage.setItem('EmployeeDetails', JSON.stringify(employeeData));
    this.helper.handleDependency(payload, 1);
    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  /**
  * Reads employee details from local storage and returns them as an Observable.
  * @returns An Observable containing employee details.
  */
  read() {
    return of(this.helper.fetchFromLocalStorage('EmployeeDetails'))
  }

  /**
  * Reads employee details from local storage and returns them as an Observable,
  * with children transformed to include their details.
  * @returns An Observable containing employee details with transformed children.
  */
  readDetailed() {
    const employeeData = this.helper.fetchFromLocalStorage('EmployeeDetails');
    return of(employeeData.map(item => this.helper.transformChildren(item)));
  }

  /**
  * Reads employee details for a specific employee ID from local storage
  * and returns them as an Observable.
  * @param id The ID of the employee to be read.
  * @returns An Observable containing employee details for the specified ID.
  */
  readById(id: string) {
    return of(this.helper.getEmployee(id));
  }

  /**
 * Updates employee data for a specific employee ID.
 * Mimics an API call by modifying data stored in local storage.
 * @param payload The updated data for the employee.
 */
  update(payload: any) {
    this.helper.handleDependencyBeforeUpdate(payload.id);

    let employeeData = this.helper.fetchFromLocalStorage('EmployeeDetails');
    const index = employeeData.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Employee not found' });
    }

    employeeData[index] = payload;
    localStorage.setItem('EmployeeDetails', JSON.stringify(employeeData));
    this.helper.handleDependency(payload, 1);
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  /**
  * Deletes employee data for a specific employee ID.
  * Mimics an API call by removing data stored in local storage.
  * @param id The ID of the employee to be deleted.
  */
  delete(id: string) {
    const result = this.helper.fetchFromLocalStorage('EmployeeDetails')
      .filter(item => item.id !== id);
    localStorage.setItem('EmployeeDetails', JSON.stringify(result));

    this.helper.deleteDependencies(id);
    return of({ isSuccess: true, msg: 'Deleted Successfully' });
  }

}
