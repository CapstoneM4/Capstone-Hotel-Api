export interface IEmployeesRequest {
  name: string;
  email: string;
  password: string;
}

export interface IEmployeeUpdate {
  name?: string;
  email?: string;
  password?: string;
  isAdm?: boolean;
  isActive?: boolean;
}
