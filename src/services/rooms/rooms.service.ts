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

  static async updateRoomService(
    hotelId: string,
    roomId: string,
    { price, isClean, isAvailable }: IRommsupdate
  ): Promise<boolean> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const roomsRepository = AppDataSource.getRepository(Rooms);

    console.log(hotelId);
    console.log(roomId);

    const hotel = await hotelRepository.findOne({
      where: {
        id: hotelId,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    const findHotelId = hotel.rooms.map((item) => {
      if (roomId === item.id) {
        return true;
      }
    });

    if (!!findHotelId) {
      if (price) {
        roomsRepository
          .createQueryBuilder("room")
          .update(Rooms)
          .set({
            price: price,
          })
          .where("id = :id", { id: roomId })
          .execute();
      }
      if (isClean) {
        await roomsRepository
          .createQueryBuilder("room")
          .update(Rooms)
          .set({
            isClean: isClean,
          })
          .where("id = :id", { id: roomId })
          .execute();
      }
      if (isAvailable) {
        await roomsRepository
          .createQueryBuilder("room")
          .update(Rooms)
          .set({
            isAvailable: isAvailable,
          })
          .where("id = :id", { id: roomId })
          .execute();
      }
    }

    return true;
  }

  static async deleteRoomService(
    hotelId: string,
    roomId: string
  ): Promise<boolean> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const roomsRepository = AppDataSource.getRepository(Rooms);

    const hotel = await hotelRepository.findOne({
      where: {
        id: hotelId,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    let verify;

    const findHotelRoomsId = hotel.rooms.map((item) => {
      if (roomId === item.id) {
        verify = true;
      }
    });

    if (verify === true) {
      await roomsRepository
        .createQueryBuilder()
        .delete()
        .from(Rooms)
        .where("id = :id", { id: roomId })
        .execute();
    }

    return true;
  }
}
export default RoomsServices;
