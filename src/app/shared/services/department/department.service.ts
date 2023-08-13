import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  helper = inject(HelperService);

  /**
  * Simulates an API call by storing data in local storage.
  * @param payload The data to be stored.
  */
  create(payload: any) {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails');

    const hasDuplicate = departmentData.some((item: any) => item.name === payload.name);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate name' });
    }

    departmentData.push(payload);
    localStorage.setItem('DepartmentDetails', JSON.stringify(departmentData));

    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  /**
  * Reads department details from local storage and returns them as an Observable.
  * @returns An Observable containing department details.
  */
  read() {
    return of(this.helper.fetchFromLocalStorage('DepartmentDetails'));
  }

  /**
  * Reads department details from local storage and returns them as an Observable,
  * with children transformed to include their details.
  * @returns An Observable containing department details with transformed children.
  */
  readDetailed() {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails');
    return of(departmentData.map(item => this.helper.transformChildren(item)));
  }

  /**
  * Reads department details for a specific department ID from local storage
  * and returns them as an Observable.
  * @param id The ID of the department to be read.
  * @returns An Observable containing department details for the specified ID.
  */
  readById(id: string) {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails')
      .find(item => item.id === id)
    return of(departmentData);
  }

  /**
  * Updates department data for a specific department ID.
  * Mimics an API call by modifying data stored in local storage.
  * @param payload The updated data for the department.
  */
  update(payload: any) {
    let departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails');
    const index = departmentData.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Department not found' });
    }

    departmentData[index] = payload;
    localStorage.setItem('DepartmentDetails', JSON.stringify(departmentData));
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  /**
  * Deletes department data for a specific department ID.
  * Mimics an API call by removing data stored in local storage.
  * @param id The ID of the department to be deleted.
  */
  delete(id: string) {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails')
      .filter(item => item.id !== id);
    localStorage.setItem('DepartmentDetails', JSON.stringify(departmentData));
    return of({ isSuccess: true, msg: 'Deleted Successfully' });
  }

}
