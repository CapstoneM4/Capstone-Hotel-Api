import AppDataSource from "../../data-source";
import { Clients } from "../../entities/clients.entities";
// import { AppError } from "../../errors/AppError";
import { IClientsCreate } from "../../interfaces/clientsInterfaces/index";

class ClientsHotelServices {
  static ClientsRepository = AppDataSource.getRepository(Clients);

  //LIST
  static async ClientsList() {
    const users = await this.ClientsRepository.find();
    const booking = this.ClientsRepository.find({
      relations: {
        booking: true,
      },
    });
    return users;
  }

  //LIST FILTER ID
  static async ClientsFilter(id: string) {
    const user = await this.ClientsRepository.findOneBy({ id: id });
    /*     if (!user) {
      throw new AppError(404, "User not exists");
    } */
    const booking = this.ClientsRepository.find({
      relations: {
        booking: true,
      },
    });
    return user;
  }

  //CREATE
  static async ClientsCreate({
    name,
    email,
    personal_id,
    cell,
    is_alocaated,
  }: IClientsCreate) {
    const clients = new Clients();

    clients.name = name;
    clients.email = email;
    clients.personalId = personal_id;
    clients.cell = cell;
    clients.isAlocated = is_alocaated;

    this.ClientsRepository.create(clients);
    this.ClientsRepository.save(clients);

    return clients;
  }
}
export default ClientsHotelServices;
