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
import { Hotel } from "../../entities/systemHotel.entities";
import { Clients } from "../../entities/clients.entities";
import { Rooms } from "../../entities/rooms.entities";
import { AppError } from "../../errors/AppError";

class BookingService {
  static bookingRepository = AppDataSource.getRepository(Booking);
  static hotelRepository = AppDataSource.getRepository(Hotel);
  static clientRepository = AppDataSource.getRepository(Clients);
  static roomRepository = AppDataSource.getRepository(Rooms);

  static async createBooking({
    checkinDate,
    checkoutDate,
    isPaid,
    qtyClients,
    idHotel,
    idClient,
    idRoom,
  }: IBookingCreate) {
    const hotelList = await this.hotelRepository.find();
    const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);

    const clientList = await this.clientRepository.find();
    const clientExists = clientList.find((client) => client.id === idClient);

    const roomtList = await this.roomRepository.find();
    const roomExists = roomtList.find((room) => room.id === idRoom);

    if (!hotelExists) {
      throw new AppError(404, "Hotel Doesn't Exists");
    }

    if (!clientExists) {
      throw new AppError(404, "Client Doesn't Exists");
    }

    if (!roomExists) {
      throw new AppError(404, "Room Doesn't Exists");
    }

    const newBooking = new Booking();
    newBooking.checkinDate = new Date(checkinDate);
    newBooking.checkoutDate = new Date(checkoutDate);
    newBooking.isPaid = isPaid;
    newBooking.qtyClients = qtyClients;
    newBooking.hotel = idHotel;
    newBooking.client = idClient;
    newBooking.room = idRoom;

    this.bookingRepository.create(newBooking);
    await this.bookingRepository.save(newBooking);

    return newBooking;
  }

  static async listBookings({ idHotel }: IListBookings) {
    const hotelList = await this.hotelRepository.find();
    const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);

    if (!hotelExists) {
      throw new AppError(404, "Hotel Doesn't Exists");
    }

    const hotelBookings = await this.bookingRepository.findBy({
      hotel: Equal(idHotel),
    });

    if (hotelBookings.length < 1) {
      throw new AppError(404, "Couldn't find any room associate to this hotel");
    }

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
    const hotelList = await this.hotelRepository.find();
    const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);

    const clientList = await this.clientRepository.find();
    const clientExists = clientList.find((client) => client.id === idClient);

    const roomtList = await this.roomRepository.find();
    const roomExists = roomtList.find((room) => room.id === idRoom);

    const bookings = await this.bookingRepository.find();
    const bookingToUpdate = bookings.find(
      (booking) => booking.id === idBooking
    );

    if (!hotelExists) {
      throw new AppError(404, "Hotel Doesn't Exists");
    }

    if (!clientExists) {
      throw new AppError(404, "Client Doesn't Exists");
    }

    if (!roomExists) {
      throw new AppError(404, "Room Doesn't Exists");
    }

    if (!bookingToUpdate) {
      throw new AppError(404, "Couldn't find booking");
    }

    if (checkinDate) {
      bookingToUpdate!.checkinDate = new Date(checkinDate);
    }
    if (checkoutDate) {
      bookingToUpdate!.checkoutDate = new Date(checkoutDate);
    }
    if (isPaid != undefined) {
      bookingToUpdate!.isPaid = isPaid;
    }
    if (qtyClients) {
      bookingToUpdate!.qtyClients = qtyClients;
    }
    if (idHotel) {
      bookingToUpdate!.hotel = idHotel;
    }
    if (idClient) {
      bookingToUpdate!.client = idClient;
    }
    if (idRoom) {
      bookingToUpdate!.room = idRoom;
    }

    await this.bookingRepository.update(bookingToUpdate!.id, bookingToUpdate);

    return bookingToUpdate;
  }

  static async deleteBooking({ idBooking }: IDeleteBooking) {
    const bookings = await this.bookingRepository.find();

    const deleteBooking = bookings.find((booking) => booking.id === idBooking);

    if (!deleteBooking) {
      throw new AppError(404, "Couldn't find booking");
    }

    await this.bookingRepository.delete(deleteBooking!.id);

    return true;
  }

  static async listOneBooking({ idBooking }: IGetBooking) {
    const bookings = await this.bookingRepository.find();

    const booking = bookings.find((booking) => booking.id === idBooking);

    if (!booking) {
      throw new AppError(404, "Couldn't find booking");
    }

    return booking;
  }
}

export default BookingService;
