import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  create(payload: any) {
    const result = this.fetch('EmployeeDetails');

    const hasDuplicate = result.some((item: any) => item.id === payload.id);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate value' });
    }

    result.push(payload);
    localStorage.setItem('EmployeeDetails', JSON.stringify(result));

    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  read() {
    return of(this.fetch('EmployeeDetails'))
  }

  readById(id: string) {
    const result = this.fetch('EmployeeDetails');
    return of(result.find(item => item.id === id));
  }

  update(payload: any) {
    const result = this.fetch('EmployeeDetails');
    result.map((item: any) => item.id === payload.id ? payload : item);
    localStorage.setItem('EmployeeDetails', JSON.stringify(result));

    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  delete(id: string) {
    const result = this.fetch('EmployeeDetails');
    return of(result.filter(item => item.id !== id));
  }

  private fetch(name: string): any[] {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : []
  }
}
