import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Rooms } from "../../entities/rooms.entities";
import { Hotel } from "../../entities/systemHotel.entities";
import { IRommsrequest } from "../../interfaces/rooms";
import {
  IHotelDelete,
  IHotelSystemCreate,
  IHotelUpdate,
} from "../../interfaces/hotel";

class HotelServices {
  static async create({
    name,
    qtyBedRooms,
    cnpj,
    address,
  }: IHotelSystemCreate): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const roomsRepository = AppDataSource.getRepository(Rooms);
    const hotels = await hotelRepository.findOne({ where: { cnpj } });

    if (hotels) {
      throw new AppError(403, "Invalid credentials");
    }

    const rooms = await roomsRepository.find();

    const hotel = new Hotel();
    hotel.name = name;
    hotel.qtyBedRooms = qtyBedRooms;
    hotel.cnpj = cnpj;
    hotel.address = address;
    hotel.rooms = rooms;

    hotelRepository.create(hotel);
    await hotelRepository.save(hotel);
    return hotel;
  }

  //list All
  static async readList(): Promise<Hotel[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelList = await hotelRepository.find();

    return hotelList;
  }
}
export default HotelServices;
