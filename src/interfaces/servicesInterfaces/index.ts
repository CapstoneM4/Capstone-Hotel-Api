export interface IServices {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IServicesCreate {
  name: string;
  description: string;
  price: number;
}

export interface IFilterId {
  id: any;
}
