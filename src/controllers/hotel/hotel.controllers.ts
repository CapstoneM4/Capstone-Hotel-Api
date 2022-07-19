import { Request, Response } from "express";
import HotelServices from "../../services/hotel/hotel.service";
import RoomsServices from "../../services/rooms/rooms.service";

class HotelControllers {
  static async createHotel(req: Request, res: Response) {
    const { name, qtyBedRooms, cnpj, address } = req.body;
    const newHotel = await HotelServices.create({
      name,
      qtyBedRooms,
      cnpj,
      address,
    });

    return res.status(201).send(newHotel);
  }

  static async listHotel(req: Request, res: Response) {
    const listDb = await HotelServices.readList();
    return res.status(201).json(listDb);
  }
}
export default HotelControllers;
