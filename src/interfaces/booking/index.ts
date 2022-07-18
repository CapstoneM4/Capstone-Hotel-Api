export interface IBookingCreate {
  checkinDate: string;
  checkoutDate: string;
  isPaid: boolean;
  qtyClients: string;
  idHotel: string;
  idClient: string;
}

export interface IBookingList {
  id: string;
  checkinDate: string;
  checkoutDate: string;
  isPaid: boolean;
  qtyClients: string;
  idHotel: string;
  idClient: string;
}
