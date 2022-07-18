import { Request, Response } from "express";
import ClientsHotelServices from "../../services/clients";

class ClientsHotelController {
  static async ListAllClients(req: Request, res: Response) {
    const users = await ClientsHotelServices.ClientsList();
    return res.status(200).json(users);
  }
  static async CreateClients(req: Request, res: Response) {
    const { name, email, personal_id, cell, is_alocaated } = req.body;
    const user = { name, email, personal_id, cell, is_alocaated };

    const create = await ClientsHotelServices.ClientsCreate(user);
    return res.status(201).json(create);
  }
  static async ListOneClient(req: Request, res: Response) {
    const { id } = req.params;
    const listOne = await ClientsHotelServices.ClientsFilter(id);
    return res.status(200).json(listOne);
  }
}

export default ClientsHotelController;
