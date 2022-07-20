export interface IBookingCreate {
  isPaid: boolean;
  qtyClients: number;
  idHotel: string;
  idClient: string;
  idRoom: string;
}

export interface IListBookings {
  idHotel: string;
}

export interface IBookingUpdate {
  idBooking: string;
  checkinDate?: Date;
  checkoutDate?: Date;
  isPaid?: boolean;
  qtyClients?: number;
  idHotel?: string;
  idClient?: string;
  idRoom?: string;
}

export interface IDeleteBooking {
  idBooking: string;
}

export interface IGetBooking {
  idBooking: string;
}
