export type Department = 'cardiology' | 'surgery';

export interface Employee {
  id: string;
  name: string;
  department: Department;
}

export interface Doctor extends Employee {
  isHeadOfDepartment: boolean;
}

export interface Nurse extends Employee {}
