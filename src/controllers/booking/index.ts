import { Request, Response } from "express";
import BookingService from "../../services/employee/employee.services";

class BookingController {
  static async createBooking(req: Request, res: Response) {
    const idHotel = req.params.id;
    const { checkinDate, checkoutDate, isPaid, qtyClients, idClient, idRoom } =
      req.body;
    try {
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
    } catch (err) {
      return "Erro ";
    }
  }

  static async listHotelBookings(req: Request, res: Response) {
    const idHotel = req.params.id;
    try {
      const hotelBookings = await BookingService.listBookings({ idHotel });

      return res.status(200).send(hotelBookings);
    } catch (err) {
      return "Erro";
    }
  }

  static async updateHotelBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;
    try {
      const {
        checkinDate,
        checkoutDate,
        isPaid,
        qtyClients,
        idHotel,
        idClient,
        idRoom,
      } = req.body;

      const updatedUser = await BookingService.updateBooking({
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
        .json({ message: "Updated with success", updatedUser });
    } catch (err) {
      return "error";
    }
  }

  static async deleteHotelBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;

    try {
      const booking = await BookingService.deleteBooking({ idBooking });

      return res.status(200).json({ message: "Booking Deleted with success!" });
    } catch (err) {
      return "Erro";
    }
  }

  static async listOneBooking(req: Request, res: Response) {
    const idBooking = req.params.idBooking;

    try {
      const booking = await BookingService.listOneBooking({ idBooking });

      return res.status(200).send(booking);
    } catch (err) {
      return "Erro";
    }
  }
}

export default BookingController;
