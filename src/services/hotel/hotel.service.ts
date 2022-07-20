import AppDataSource from "../../data-source";
import { Hotel } from "../../entities/systemHotel.entities";
import { AppError } from "../../errors/AppError";
import {
  IHotelDelete,
  IHotelSystemCreate,
  IHotelUpdate,
} from "../../interfaces/hotel";

class HotelService {
  //create
  static async create({
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
  static async readList(): Promise<Hotel[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelList = await hotelRepository.find();

    return hotelList;
  }
  //update
  static async update({
    id,
    name,
    cnpj,
    address,
    qtyBedRooms,
  }: IHotelUpdate): Promise<Hotel> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotel = await hotelRepository.findOneBy({ id: id });
    if (!hotel) {
      throw new AppError(400, "Hotel not Found!");
    }

    Object.assign(hotel, { name, cnpj, address, qtyBedRooms });

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
  static async readInfo(id: string): Promise<Hotel | null> {
    const hotelRepository = AppDataSource.getRepository(Hotel);
    const hotelInfo = hotelRepository.findOneBy({ id: id });

    return hotelInfo;
  }
}

export default HotelService;
