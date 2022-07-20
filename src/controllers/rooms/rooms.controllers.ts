import { Request, Response } from "express";
import RoomsServices from "../../services/rooms/rooms.service";

class RoomsControllers {
  static async createRooms(req: Request, res: Response) {
    const { roomNumber, floorNumber, price, isClean, isAvailable } = req.body;

    const { id } = req.params;

    const newRomm = await RoomsServices.createRoomService(id, {
      roomNumber,
      floorNumber,
      price,
      isClean,
      isAvailable,
    });

    return res.status(200).json(newRomm);
  }

  static async listRooms(req: Request, res: Response) {
    const { id } = req.params;

    const hotelRooms = await RoomsServices.listRoomsService(id);

    return res.status(200).json(hotelRooms);
  }

  static async listRoomsByid(req: Request, res: Response) {
    const { id } = req.params;
    const room = await RoomsServices.listRoomByIdService(id);
    return res.status(200).json(room);
  }

  static async updateRoom(req: Request, res: Response) {
    const { id } = req.params;
    const { price, isClean, isAvailable } = req.body;

    const updated = await RoomsServices.updateRoomService(id, {
      price,
      isClean,
      isAvailable,
    });

    return res.status(200).json({
      message: "Updated with success!",
    });
  }

  static async deleteRoom(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await RoomsServices.deleteRoomService(id);

    return res.status(200).json({
      message: "Deleted with success!",
    });
  }
}
export default RoomsControllers;
