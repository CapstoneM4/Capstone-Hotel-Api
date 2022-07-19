import AppDataSource from "../../data-source";
import { Clients } from "../../entities/clients.entities";
import { IClientsCreate } from "../../interfaces/clientsInterface";
import { AppError } from "../../errors/AppError";

class ClientsHotelServices {
  static ClientsRepository = AppDataSource.getRepository(Clients);

  //LIST
  static async ClientsList() {
    const users = await this.ClientsRepository.find();

    return users;
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
    const clientsAlreadyExistsId = await this.ClientsRepository.findOneBy({
      personalId: personalId,
    });
    const clientsAlreadyExistsEmail = await this.ClientsRepository.findOneBy({
      email: email,
    });

    if (clientsAlreadyExistsId || clientsAlreadyExistsEmail) {
      throw new AppError(400, "Client already registered");
    }

    const clients = new Clients();

    clients.name = name;
    clients.email = email;

    clients.personalId = personalId;
    clients.cell = cell;
    clients.isAlocated = isAlocated;

    this.ClientsRepository.create(clients);
    this.ClientsRepository.save(clients);

    return clients;
  }
}
export default ClientsHotelServices;
