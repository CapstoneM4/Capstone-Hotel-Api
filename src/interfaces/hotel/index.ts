export interface IHotelSystemCreate {
  name: string;
  qtyBedRooms: number;
  cnpj: string;
  address: string;
}

export interface IHotelSystem extends IHotelSystemCreate {
  id: string;
}

export interface IHotelUpdate {
  id: string;
  name?: string;
  qtyBedRooms?: number;
  cnpj?: string;
  address?: string;
}

export interface IHotelDelete {
  id: string;
}
