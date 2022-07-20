export interface IBookingServiceCreate {
  idService: number;
  idEmployee: string;
  idBooking: string;
}

export interface IGetBookingServices {
  idBooking: string;
}
