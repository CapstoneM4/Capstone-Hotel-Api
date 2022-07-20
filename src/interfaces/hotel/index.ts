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
  name?: string;
  qtyBedRooms?: number;
  address?: string;
}

export interface IHotelDelete {
  id: string;
}
