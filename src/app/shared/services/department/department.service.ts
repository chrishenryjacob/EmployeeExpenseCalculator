import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  helper = inject(HelperService);

  create(payload: any) {
    const data = this.helper.fetchFromLocalStorage('DepartmentDetails');

    const hasDuplicate = data.some((item: any) => item.name === payload.name);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate name' });
    }

    data.push(payload);
    localStorage.setItem('DepartmentDetails', JSON.stringify(data));

    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  read() {
    return of(this.helper.fetchFromLocalStorage('DepartmentDetails'));
  }

  private convertSubordinates(result: any[], id: string): any {
    const item = result.find(res => res.id === id);
    if (item) {
      item.children = item.children.map((subId: string) => this.convertSubordinates(result, subId));
      return item;
    }
    return null;
  }

  readDetailed() {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails');
    const employeeData = this.helper.fetchFromLocalStorage('EmployeeDetails');

    departmentData.forEach(item => {
      item.children = item.children.map((subId: string) => this.convertSubordinates(employeeData, subId));
    });

    return of(departmentData);
  }

  readById(id: string) {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails')
      .find(item => item.id === id)
    return of(departmentData);
  }

  update(payload: any) {
    let data = this.helper.fetchFromLocalStorage('DepartmentDetails');
    const index = data.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Department not found' });
    }

    data[index] = payload;
    localStorage.setItem('DepartmentDetails', JSON.stringify(data));
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  delete(id: string) {
    const departmentData = this.helper.fetchFromLocalStorage('DepartmentDetails')
      .filter(item => item.id !== id);
    localStorage.setItem('DepartmentDetails', JSON.stringify(departmentData));
    return of({ isSuccess: true, msg: 'Deleted Successfully' });
  }

}
