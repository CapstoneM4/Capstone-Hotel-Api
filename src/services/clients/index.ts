import AppDataSource from "../../data-source";
import { Clients } from "../../entities/clients.entities";
import { Booking } from "../../entities/booking.entities";
import { IClientsCreate } from "../../interfaces/clientsInterface";
import { AppError } from "../../errors/AppError";

class ClientsHotelServices {
  static ClientsRepository = AppDataSource.getRepository(Clients);
  static BookingRepository = AppDataSource.getRepository(Booking);

  //LIST
  static async ClientsList() {
    /*     const users = await this.ClientsRepository.find();
    const result = users.map((user) => {
      const books =   AppDataSource.getRepository(Booking);.createQueryBuilder("Booking")
    .where("user.id = :id", { id: 1 })
    .getOne()
    });

    return users; */
    const user = await this.ClientsRepository.createQueryBuilder("Clients")
      .innerJoinAndSelect("Clients.booking", "Booking")
      .getMany();
    return user;
  }

  //LIST FILTER ID
  static async ClientsFilter(id: string) {
    const users = await this.ClientsRepository.find();
    const user = users.find((user) => user.id === id);

    console.log(user);

    if (!user) {
      throw new AppError(404, "User not exists");
    }

    return user;
  }

  //CREATE
  static async ClientsCreate({
    name,
    email,

    personalId,
    cell,
    isAlocated,
  }: IClientsCreate) {
    const clientsAlreadyExistsId = (await this.ClientsList()).find(
      (user) => user.personalId === personalId
    );
    const clientsAlreadyExistsEmail = (await this.ClientsList()).find(
      (user) => user.email === email
    );

    const booking = await this.BookingRepository.find();

    if (clientsAlreadyExistsId || clientsAlreadyExistsEmail) {
      throw new AppError(400, "Client already registered");
    }

    const clients = new Clients();

    clients.name = name;
    clients.email = email;

    clients.personalId = personalId;
    clients.cell = cell;
    clients.isAlocated = isAlocated;

    clients.booking = booking;

    this.ClientsRepository.create(clients);
    this.ClientsRepository.save(clients);

    return clients;
  }
}
export default ClientsHotelServices;
