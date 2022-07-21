import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Hotel } from "../../entities/systemHotel.entities";
import {
  IHotelDelete,
  IHotelSystemCreate,
  IHotelUpdate,
} from "../../interfaces/hotel";

class HotelServices {
  static async createHotelService({
    name,
    qtyBedRooms,
    cnpj,
    address,
  }: IHotelSystemCreate): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotels = await hotelRepository.findOne({ where: { cnpj } });

    if (hotels) {
      throw new AppError(403, "Invalid credentials");
    }

    const hotel = new Hotel();
    hotel.name = name;
    hotel.qtyBedRooms = qtyBedRooms;
    hotel.cnpj = cnpj;
    hotel.address = address;

    hotelRepository.create(hotel);
    await hotelRepository.save(hotel);
    return hotel;
  }

  //list All
  static async listHotelsService(): Promise<Hotel[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelList = await hotelRepository.find();

    return hotelList;
  }

  //listById
  static async listByIdService(id: string): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    return hotel;
  }
  //delete
  static async delete({ id }: IHotelDelete): Promise<void> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const listHotel = await hotelRepository.find();
    const hotelDelete = listHotel.find((hotel) => hotel.id === id);
    console.log(id);

    if (!hotelDelete) {
      throw new AppError(400, "Hotel not found!");
    }
    await hotelRepository.delete(id);
    return;
  }
  //list One
  static async readInfo(id: string) {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelInfo = hotelRepository.findOneBy({ id: id });
  }
  //updateHotel
  static async updateHotelService(
    id: string,
    { name, qtyBedRooms, address }: IHotelUpdate
  ): Promise<boolean> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    } else if (hotel.name === name) {
      throw new AppError(400, "Name already in use!");
    } else if (hotel.qtyBedRooms === qtyBedRooms) {
      throw new AppError(400, `Hotel already has ${qtyBedRooms} Bedrooms!`);
    } else if (hotel.address === address) {
      throw new AppError(400, `Hotel already registered in ${address}!`);
    }

    name
      ? await hotelRepository
          .createQueryBuilder()
          .update(Hotel)
          .set({ name: name })
          .where("id = :id", { id: id })
          .execute()
      : qtyBedRooms
      ? await hotelRepository
          .createQueryBuilder()
          .update(Hotel)
          .set({ qtyBedRooms: qtyBedRooms })
          .where("id = :id", { id: id })
          .execute()
      : address &&
        (await hotelRepository
          .createQueryBuilder()
          .update(Hotel)
          .set({ address: address })
          .where("id = :id", { id: id })
          .execute());

    return true;
  }

  //deleteById
  static async deleteHotelService(id: string): Promise<boolean> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    if (hotel.rooms.length > 0) {
      throw new AppError(403, "Hotel has rooms registered");
    }

    await hotelRepository
      .createQueryBuilder()
      .delete()
      .from(Hotel)
      .where("id = :id", { id: id })
      .execute();

    return true;
  }
}
export default HotelServices;
