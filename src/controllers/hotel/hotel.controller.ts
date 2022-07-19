import { Request, Response } from "express";
import HotelService from "../../services/hotel/hotel.service";

class HotelController {
  static async create(req: Request, res: Response) {
    const { name, qtyBedRooms, cnpj, address } = req.body;
    const newHotel = await HotelService.create({
      name,
      qtyBedRooms,
      cnpj,
      address,
    });

    return res.status(201).send(newHotel);
  }

  static async update(req: Request, res: Response) {
    const id: string = req.params.id;
    const { name, qtyBedRooms, cnpj, address } = req.body;
    const updatedHotel = await HotelService.update({
      name,
      qtyBedRooms,
      cnpj,
      address,
      id,
    });

    return res.status(201).send(updatedHotel);
  }

  static async delete(req: Request, res: Response) {
    const id: string = req.params.id;
    await HotelService.delete({ id });
    return res.status(200).json({ message: "Hotel Deleted!" });
  }

  static async listHotel(req: Request, res: Response) {
    const listDb = await HotelService.readList();
    console.log(listDb);
    return res.status(201).json(listDb);
  }

  static async infoHotel(req: Request, res: Response) {
    const id: string = req.params.id;
    const hotelList = await HotelService.readInfo(id);

    return res.status(200).json(hotelList);
  }
}
export default HotelController;
