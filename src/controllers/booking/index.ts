import { Request, Response } from "express";
import BookingService from "../../services/employee/employee.services";

class BookingController {
  static async createBooking(req: Request, res: Response) {
    const idHotel = req.params.id;
    const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } =
      req.body;

    const newBooking = await BookingService.createBooking({
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

    const hotelBookings = await BookingService.listBookings({ idHotel });

    return res.status(200).send(hotelBookings);
  }

  static async updateHotelBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;
    const idHotel = req.params.id;

    const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } =
      req.body;

    const updatedBooking = await BookingService.updateBooking({
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

    const booking = await BookingService.deleteBooking({ idBooking });

    return res.status(200).json({ message: "Booking Deleted with success!" });
  }

  static async listOneBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;

    const booking = await BookingService.listOneBooking({ idBooking });

    return res.status(200).send(booking);
  }
}

export default BookingController;
