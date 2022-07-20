import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IRommsrequest, IRommsupdate } from "../../interfaces/rooms";
import { Hotel } from "../../entities/systemHotel.entities";
import { Rooms } from "../../entities/rooms.entities";

class RoomsServices {
  static async createRoomService(
    hotelId: string,
    { roomNumber, floorNumber, price, isClean, isAvailable }: IRommsrequest
  ): Promise<Rooms> {
    const roomsRepository = AppDataSource.getTreeRepository(Rooms);
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: hotelId,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    const newRoom = roomsRepository.create({
      roomNumber,
      floorNumber,
      price,
      isClean,
      isAvailable,
    });

    newRoom.hotel = hotel;

    await roomsRepository.save(newRoom);

    return newRoom;
  }

  static async listRoomsService(hotelId: string): Promise<Rooms[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const findHotel = await hotelRepository.findOne({
      where: {
        id: hotelId,
      },
    });

    if (!findHotel) {
      throw new AppError(404, "Hotel not found!");
    }

    return findHotel.rooms;
  }

  static async listRoomByIdService(id: string) {
    const roomsRepository = AppDataSource.getRepository(Rooms);

    const room = await roomsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!room) {
      throw new AppError(404, "Room not found!");
    }

    return room;
  }

  static async updateRoomService(
    id: string,
    { price, isClean, isAvailable }: IRommsupdate
  ): Promise<boolean> {
    const roomsRepository = AppDataSource.getRepository(Rooms);

    const room = await roomsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!room) {
      throw new AppError(404, "Hotel not found!");
    } else if (room.price == price) {
      throw new AppError(400, `Room price already is ${price}!`);
    } else if (room.isClean === isClean) {
      throw new AppError(404, `Room already has ${isClean} status!`);
    } else if (room.isAvailable === isAvailable) {
      throw new AppError(404, `Room already has ${isAvailable} status!`);
    }

    isClean != undefined ? (room.isClean = isClean) : isClean;
    isAvailable != undefined ? (room.isAvailable = isAvailable) : isAvailable;
    price ? (room.price = price) : price;

    await roomsRepository.update(room.id, room);

    return true;
  }

  static async deleteRoomService(id: string): Promise<boolean> {
    const roomsRepository = AppDataSource.getRepository(Rooms);

    const room = await roomsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!room) {
      throw new AppError(404, "Room not found!");
    }

    await roomsRepository
      .createQueryBuilder()
      .delete()
      .from(Rooms)
      .where("id = :id", { id: id })
      .execute();

    return true;
  }
}
export default RoomsServices;
