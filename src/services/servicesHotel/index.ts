import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entities";

import { AppError } from "../../errors/AppError";

import { IServicesCreate } from "../../interfaces/servicesInterfaces";

class ServicesHotelService {
  static servicesRepository = AppDataSource.getRepository(Services);
  static async services() {
    return await this.servicesRepository.find();
  }

  // CREATE
  static async CreateServicesHotel({
    name,
    description,
    price,
  }: IServicesCreate): Promise<Services> {

    const ServicesList = await this.services();
    const ServicesAlreadyExists = ServicesList.find(
      (service) => service.name === name
    );

    if (ServicesAlreadyExists) {
      throw new AppError(400, "Services already exists on this hotel");
    }


    const services = new Services();
    services.name = name;
    services.description = description;
    services.price = price;

    this.servicesRepository.create(services);
    this.servicesRepository.save(services);

    return services;
  }

  //LIST ALL
  static async ListServServices(): Promise<Services[]> {
    const allServices = this.services();
    return allServices;
  }

  //LIST ONE
  static async ListOneServices(id: number): Promise<Services> {
    const servicesList = await this.services();
    const servicesOne = servicesList.find((service) => service.id === id);

    if (!servicesOne) {
      throw new AppError(404, "Services not found");
    }
    return servicesOne;
  }
}

export default ServicesHotelService;
