import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  createEmployee(payload: any) {
    const storedData = localStorage.getItem('mockData');
    return of(storedData);
  }

  updateEmployee(payload: any) {
    const storedData = localStorage.getItem('mockData');
    return of(storedData);
  }

}
