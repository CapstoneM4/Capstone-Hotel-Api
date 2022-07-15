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
  id: string;
  name?: string;
  email?: string;
  password?: string;
  isAdm?: boolean;
  isActive?: boolean;
}

//Seguir modelo acima para criação de objeto e update.