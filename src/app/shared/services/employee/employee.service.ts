import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';

import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  helper = inject(HelperService);

  create(payload: any) {
    const data = this.helper.fetchFromLocalStorage('EmployeeDetails');

    const hasDuplicate = data.some((item: any) => item.name === payload.name);
    if (hasDuplicate) {
      return of({ isSuccess: false, msg: 'Duplicate name' });
    }

    data.push(payload);
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
    this.helper.handleDependency(payload, 1);
    return of({ isSuccess: true, msg: 'Created Successfully' });
  }

  update(payload: any) {
    this.helper.handleDependencyBeforeUpdate(payload.id);

    let data = this.helper.fetchFromLocalStorage('EmployeeDetails');
    const index = data.findIndex(item => item.id === payload.id);
    if (index === -1) {
      return of({ isSuccess: false, msg: 'Employee not found' });
    }

    data[index] = payload;
    localStorage.setItem('EmployeeDetails', JSON.stringify(data));
    this.helper.handleDependency(payload, 1);
    return of({ isSuccess: true, msg: 'Updated Successfully' });
  }

  delete(id: string) {
    const result = this.helper.fetchFromLocalStorage('EmployeeDetails')
      .filter(item => item.id !== id);
    localStorage.setItem('EmployeeDetails', JSON.stringify(result));

    this.helper.deleteDependencies(id);
    return of({ isSuccess: true, msg: 'Deleted Successfully' });
  }

  read() {
    return of(this.helper.fetchFromLocalStorage('EmployeeDetails'))
  }

  readDetailed() {
    const data = this.helper.fetchFromLocalStorage('EmployeeDetails');
    return of(data.map(item => this.helper.transformChildren(item)));
  }

  readById(id: string) {
    return of(this.helper.getEmployee(id));
  }

}
