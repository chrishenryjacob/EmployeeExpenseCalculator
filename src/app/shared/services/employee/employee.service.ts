import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  create(payload: any) {
    const data = this.fetch('EmployeeDetails');

    const hasDuplicate = data.some((item: any) => item.id === payload.id);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate value' });
    }

    data.push(payload);
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));

    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  read() {
    return of(this.fetch('EmployeeDetails'))
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
    const data = this.fetch('EmployeeDetails');
    return of(data.map(item => this.transformSubordinates(item)));
  }

  transformSubordinates(data: any) {
    if (data.subordinates.length > 0) {
      const subordinates = data.subordinates.map((subId: string) =>
        this.transformSubordinates(this.getEmployee(subId)));
      return { ...data, subordinates: subordinates.filter(Boolean) };
    } else {
      return data;
    }
  }

  getEmployee(id: string) {
    return this.fetch('EmployeeDetails').find(item => item.id === id);
  }

  readById(id: string) {
    const data = this.fetch('EmployeeDetails');
    return of(data.find(item => item.id === id));
  }

  update(payload: any) {
    let data = this.fetch('EmployeeDetails');
    const index = data.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Employee not found' });
    }

    data[index] = payload;
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  delete(id: string) {
    const data = this.fetch('EmployeeDetails');
    const result = data.filter(item => item.id !== id);
    localStorage.setItem('EmployeeDetails', JSON.stringify(result));
    return of({ isSuccess: true, msg: 'Deleted Successfully' });
  }

  private fetch(name: string): any[] {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : []
  }
}
