import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  create(payload: any) {
    const data = this.fetch('EmployeeDetails');

    const hasDuplicate = data.some((item: any) => item.name === payload.name);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate name' });
    }

    data.push(payload);
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
    this.addRefs(payload);
    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  read() {
    return of(this.fetch('EmployeeDetails'))
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
    const data = this.fetch('EmployeeDetails');
    return of(data.map(item => this.transformSubordinates(item)));
  }

  private addRefs(data: any) {
    if (data.type === 'Manager') {
      const ids = this.retrieveManagerIds(data);
      if (ids.length > 0) {
        ids.forEach(id => this.addRefId(id, data.id))
      }
    }
  }

  private addRefId(id: string, refId: string) {
    let data = this.fetch('EmployeeDetails');
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }

    data[index].refs = data[index].refs ? data[index].refs : [];
    if (!data[index].refs.includes(refId)) {
      data[index].refs.push(refId);
    }

    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
  }

  private getManagerIds(data: any, result: any[] = []) {
    if (data.type === 'Manager' && data.children?.length > 0) {
      data.children.forEach((subId: string) => {
        const manager = this.getManager(subId);
        if (manager) {
          result.push(manager.id);
          this.getManagerIds(manager, result);
        }
      });
    }
  }

  private retrieveManagerIds(data: any) {
    const result: any[] = [];
    this.getManagerIds(data, result);
    return result;
  }

  getManager(id: string) {
    return this.fetch('EmployeeDetails').find(item => item.id === id && item.type === 'Manager');
  }

  private transformSubordinates(data: any) {
    if (data.children.length > 0) {
      const children = data.children.map((subId: string) =>
        this.transformSubordinates(this.getEmployee(subId)));
      return { ...data, children: children.filter(Boolean) };
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
    this.updateRefs(payload.id);
    let data = this.fetch('EmployeeDetails');
    const index = data.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Employee not found' });
    }

    data[index] = payload;
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
    this.addRefs(payload);
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  private updateRefs(id: string) {
    let employeeDetails = this.fetch('EmployeeDetails');
    const index = employeeDetails.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }
    const data = employeeDetails[index];
    if (data.type === 'Manager') {
      const ids = this.retrieveManagerIds(data);
      if (ids.length > 0) {
        ids.forEach(id => this.updateRefId(id, data.id))
      }
    }
  }

  private updateRefId(id: string, refId: string) {
    let data = this.fetch('EmployeeDetails');
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }

    data[index].refs = data[index].refs ? data[index].refs.filter((item: string) => item != refId) : [];

    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
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
