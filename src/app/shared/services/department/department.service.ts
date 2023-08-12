import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  create(payload: any) {
    const data = this.fetch('DepartmentDetails');

    const hasDuplicate = data.some((item: any) => item.id === payload.id);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate value' });
    }

    data.push(payload);
    localStorage.setItem('DepartmentDetails', JSON.stringify(data));

    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  read() {
    return of(this.fetch('DepartmentDetails'));
  }

  private convertSubordinates(result: any[], id: string): any {
    const item = result.find(res => res.id === id);
    if (item) {
      item.subordinates = item.subordinates.map((subId: string) => this.convertSubordinates(result, subId));
      return item;
    }
    return null;
  }

  readDetailed() {
    const departmentData = this.fetch('DepartmentDetails');
    const employeeData = this.fetch('EmployeeDetails');

    departmentData.forEach(item => {
      item.members = item.members.map((subId: string) => this.convertSubordinates(employeeData, subId));
    });

    return of(departmentData);
  }

  readById(id: string) {
    const data = this.fetch('DepartmentDetails');
    return of(data.find(item => item.id === id));
  }

  update(payload: any) {
    let data = this.fetch('DepartmentDetails');
    const index = data.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Department not found' });
    }

    data[index] = payload;
    localStorage.setItem('DepartmentDetails', JSON.stringify(data));
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  delete(id: string) {
    const data = this.fetch('DepartmentDetails');
    const result = data.filter(item => item.id !== id);
    localStorage.setItem('DepartmentDetails', JSON.stringify(result));
    return of(result);
  }

  private fetch(name: string): any[] {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : [];
  }
}
