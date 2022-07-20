export interface IEmployeeCreate {
  name: string;
  email: string;
  password: string;
  idHotel: string;
  idJobTitle: number;
}

export interface IEmployee extends IEmployeeCreate {
  id: string;
  isAdm: boolean;
  isActive: boolean;
}

export interface IEmployeeUpdate {
  name?: string;
  email?: string;
  password?: string;
  isAdm?: boolean;
  isActive?: boolean;
}

//Seguir modelo acima para criação de objeto e update.

export interface IJobTitleCreate {
  name: string;
  description: string;
}

export interface IJobTitle extends IJobTitleCreate {
  id: number;
}

export interface IJobTitleUpdateAssign {
  name?: string;
  description?: string;
}

export interface IJobTitleUpdate {
  id: string;
  name?: string;
  description?: string;
}

export interface IEmployeesRequest {
  name: string;
  email: string;
  password: string;
}
