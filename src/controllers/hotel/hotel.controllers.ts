import { Request, Response } from "express";
import HotelServices from "../../services/hotel/hotel.service";

class HotelControllers {
  static async createHotel(req: Request, res: Response) {
    const { name, qtyBedRooms, cnpj, address } = req.body;
    const newHotel = await HotelServices.createHotelService({
      name,
      qtyBedRooms,
      cnpj,
      address,
    });

    return res.status(201).send(newHotel);
  }

  static async listHotel(req: Request, res: Response) {
    const listDb = await HotelServices.listHotelsService();
    return res.status(200).json(listDb);
  }

  static async listHotelById(req: Request, res: Response) {
    const { id } = req.params;
    const list = await HotelServices.listByIdService(id);
    return res.status(200).json(list);
  }

  static async updateHotel(req: Request, res: Response) {
    const { id } = req.params;
    const { qtyBedRooms, address, name } = req.body;
    const updated = await HotelServices.updateHotelService(id, {
      name,
      qtyBedRooms,
      address,
    });

    return res.status(200).json({
      message: "Updated with success!",
    });
  }

  static async deleteHotel(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await HotelServices.deleteHotelService(id);

    return res.status(200).json({
      message: "Deleted with success",
    });
  }
}
export default HotelControllers;
