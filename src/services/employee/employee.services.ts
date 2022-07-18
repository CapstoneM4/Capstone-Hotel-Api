import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entities";
import {
  IBookingCreate,
  IDeleteBooking,
  IListBookings,
  IGetBooking,
  IBookingUpdate,
} from "../../interfaces/booking";
import { Equal } from "typeorm";

class BookingService {
  static async createBooking({
    checkinDate,
    checkoutDate,
    isPaid,
    qtyClients,
    idHotel,
    idClient,
    idRoom,
  }: IBookingCreate) {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const newBooking = new Booking();
    newBooking.checkinDate = new Date(checkinDate);
    newBooking.checkoutDate = new Date(checkoutDate);
    newBooking.isPaid = isPaid;
    newBooking.qtyClients = qtyClients;
    newBooking.hotel = idHotel;
    newBooking.client = idClient;
    newBooking.room = idRoom;

    bookingRepository.create(newBooking);
    await bookingRepository.save(newBooking);

    return newBooking;
  }

  static async listBookings({ idHotel }: IListBookings) {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const hotelBookings = await bookingRepository.findBy({
      hotel: Equal(idHotel),
    });

    return hotelBookings;
  }

  static async updateBooking({
    idBooking,
    checkinDate,
    checkoutDate,
    isPaid,
    qtyClients,
    idHotel,
    idClient,
    idRoom,
  }: IBookingUpdate): Promise<Booking> {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const bookings = await bookingRepository.find();

    const bookingToUpdate = bookings.find(
      (booking) => booking.id === idBooking
    );

    if (!bookingToUpdate) {
      throw new Error("Account not found");
    }

    // if (!bookingToUpdate) {
    //   throw new AppError(404, "Account not found");
    // }

    checkinDate
      ? (bookingToUpdate!.checkinDate = checkinDate)
      : checkoutDate
      ? (bookingToUpdate!.checkoutDate = checkoutDate)
      : isPaid != undefined
      ? (bookingToUpdate!.isPaid = isPaid)
      : qtyClients
      ? (bookingToUpdate!.qtyClients = qtyClients)
      : idHotel
      ? (bookingToUpdate!.hotel = idHotel)
      : idClient
      ? (bookingToUpdate!.client = idClient)
      : idRoom
      ? (bookingToUpdate!.room = idRoom)
      : checkinDate;

    await bookingRepository.update(bookingToUpdate!.id, bookingToUpdate);

    return bookingToUpdate;
  }

  static async deleteBooking({ idBooking }: IDeleteBooking) {
    const bookingRepository = AppDataSource.getRepository(Booking);

    const bookings = await bookingRepository.find();

    const deleteBooking = bookings.find((booking) => booking.id === idBooking);

    await bookingRepository.delete(deleteBooking!.id);

    return true;
  }

  static async listOneBooking({ idBooking }: IGetBooking) {
    const userRepository = AppDataSource.getRepository(Booking);

    const bookings = await userRepository.find();

    const booking = bookings.find((booking) => booking.id === idBooking);

    return booking;
  }
}

export default BookingService;
