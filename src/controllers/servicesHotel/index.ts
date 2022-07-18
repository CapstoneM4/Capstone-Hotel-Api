import { Request, Response } from "express";
import ServicesHotelService from "../../services/servicesHotel";

class ServicesHotelController {
  static async create(req: Request, res: Response) {
    const { name, description, price } = req.body;

    const servicesHotelCreate = await ServicesHotelService.CreateServicesHotel({
      name,
      description,
      price,
    });

    return res.status(201).send(servicesHotelCreate);
  }

  static async list(req: Request, res: Response) {
    const listAll = await ServicesHotelService.ListServServices();
    return res.status(200).send(listAll);
  }

  static async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = parseInt(id);

    const listAll = await ServicesHotelService.ListOneServices(numberId);
    return res.status(200).send(listAll);
  }
}

export default ServicesHotelController;
