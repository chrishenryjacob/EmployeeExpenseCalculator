import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  fetchFromLocalStorage(name: string): any[] {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : []
  }

  /**
   * Removes dependencies of an employee when the employee is deleted.
   * @param employeeId The ID of the employee being deleted.
   */
  deleteDependencies(employeeId: string) {
    const employeeDetails = this.fetchFromLocalStorage('EmployeeDetails');

    employeeDetails.forEach(item => {
      item.refs = item.refs?.filter((id: string) => id != employeeId);
      item.children = item.children?.filter((id: string) => id != employeeId);
    })
    localStorage.setItem('EmployeeDetails', JSON.stringify(employeeDetails));


    const departmentDetails = this.fetchFromLocalStorage('DepartmentDetails');
    departmentDetails.forEach(item => {
      item.children = item.children?.filter((id: string) => id != employeeId);
    })
    localStorage.setItem('DepartmentDetails', JSON.stringify(departmentDetails));
  }

  private getManager(id: string) {
    return this.fetchFromLocalStorage('EmployeeDetails')
      .find(item => item.id === id && item.type === 'Manager');
  }

  getEmployee(id: string) {
    return this.fetchFromLocalStorage('EmployeeDetails')
      .find(item => item.id === id);
  }

  /**
  * Recursively fetches all manager IDs from the provided hierarchy.
  * @param hierarchy The hierarchical structure containing all employees.
  * @param result An array of manager IDs in the hierarchy.
  * @returns An array of manager IDs in the hierarchy.
  */
  private retrieveManagerIds(hierarchy: any) {
    const result: any[] = [];
    this.getManagerIds(hierarchy, result);
    return result;
  }

  private getManagerIds(hierarchy: any, result: any[] = []) {
    if (hierarchy.type === 'Manager' && hierarchy.children?.length > 0) {
      hierarchy.children.forEach((subId: string) => {
        const manager = this.getManager(subId);
        if (manager) {
          result.push(manager.id);
          this.getManagerIds(manager, result);
        }
      });
    }
  }

  /**
  * Sanitizes the data by removing the current manager's references from its children.
  * @param id The ID of the employee whose data is being sanitized.
  */
  handleDependencyBeforeUpdate(id: string) {
    let employeeDetails = this.fetchFromLocalStorage('EmployeeDetails');
    const index = employeeDetails.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }

    this.handleDependency(employeeDetails[index], 0);
  }

  /**
  * Handles all manager employees' dependencies for cyclic dependency removal.
  * @param employeeData The data containing employee details.
  * @param type The type of operation: 0 for default (cyclic dependency removal).
  */
  handleDependency(employeeData: any, type: number = 0) {
    if (employeeData.type === 'Manager') {
      const ids = this.retrieveManagerIds(employeeData);
      if (ids.length > 0) {
        ids.forEach(id => this.handleRefId(id, employeeData.id, type))
      }
    }
  }

  /**
  * Handles adding or removing dependencies as refs of an manager based on the action parameter.
  * @param employeeId The ID of the manager whose parent dependencies are being modified.
  * @param refId The ID of the parent manager.
  * @param action The action to perform: 1 for adding, 0 for removing.
  */
  private handleRefId(employeeId: string, refId: string, action: number) {
    let employeeData = this.fetchFromLocalStorage('EmployeeDetails');
    const index = employeeData.findIndex(item => item.id === employeeId);

    if (index === -1) {
      return;
    }

    if (action) {
      this.addRefId(employeeData[index], refId);
    }
    else {
      this.removeRefId(employeeData[index], refId);
    }

    localStorage.setItem('EmployeeDetails', JSON.stringify(employeeData));
  }

  private addRefId(employee: any, refId: string) {
    employee.refs = employee.refs ? employee.refs : [];
    if (!employee.refs.includes(refId)) {
      employee.refs.push(refId);
    }
  }

  private removeRefId(employee: any, refId: string) {
    employee.refs = employee.refs
      ? employee.refs.filter((item: string) => item != refId)
      : [];
  }

  /**
  * Transforms employee IDs into their corresponding details recursively.
  * @param data The data containing an employee and its subordinates' IDs.
  * @returns The transformed data with employee details nested under subordinates.
  */
  transformSubordinates(data: any) {
    if (data.children.length > 0) {
      const children = data.children.map((subId: string) =>
        this.transformSubordinates(this.getEmployee(subId)));
      return { ...data, children: children.filter(Boolean) };
    } else {
      return data;
    }
  }

}
