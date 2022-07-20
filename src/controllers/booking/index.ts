import { Request, Response } from "express";
import BookingServiceClass from "../../services/employee/employee.services";

class BookingController {
  static async createBooking(req: Request, res: Response) {
    const idHotel = req.params.id;
    const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } =
      req.body;

    const newBooking = await BookingServiceClass.createBooking({
      checkinDate,
      checkoutDate,
      isPaid,
      qtyClients,
      idHotel,
      idClient,
      idRoom,
    });
    return res.status(201).send(newBooking);
  }

  static async listHotelBookings(req: Request, res: Response) {
    const idHotel = req.params.id;

    const hotelBookings = await BookingServiceClass.listBookings({ idHotel });

    return res.status(200).send(hotelBookings);
  }

  static async updateHotelBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;
    const idHotel = req.params.id;

    const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } =
      req.body;

    const updatedBooking = await BookingServiceClass.updateBooking({
      idBooking,
      checkinDate,
      checkoutDate,
      isPaid,
      qtyClients,
      idHotel,
      idClient,
      idRoom,
    });

    return res
      .status(201)
      .json({ message: "Updated with success", updatedBooking });
  }

  static async deleteHotelBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;

    const booking = await BookingServiceClass.deleteBooking({ idBooking });

    return res.status(200).json({ message: "Booking Deleted with success!" });
  }

  static async listOneBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;

    const booking = await BookingServiceClass.listOneBooking({ idBooking });

    return res.status(200).send(booking);
  }

  static async createBookingService(req: Request, res: Response) {
    const { idBooking } = req.params;

    const { idService, idEmployee } = req.body;

    const newBookingService = await BookingServiceClass.createBookingService({
      idService,
      idEmployee,
      idBooking,
    });

    return res.status(200).send(newBookingService);
  }

  static async listBookingServices(req: Request, res: Response) {
    const { idBooking } = req.params;

    const bookingServices = await BookingServiceClass.listBookingServices({
      idBooking,
    });

    return res.status(200).send(bookingServices);
  }
}

export default BookingController;
