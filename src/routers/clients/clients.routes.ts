import { Router } from "express";
import ClientsHotelController from "../../controllers/clients";

const routesClients = Router();

routesClients.post(
  "",
  ClientsHotelController.CreateClients /*Controller de criação de clientes*/
);
routesClients.get(
  "/",
  ClientsHotelController.ListAllClients /*Controller de listagem dos clientes*/
);
routesClients.get(
  "/:id",
  ClientsHotelController.ListOneClient /*Controller de listagem de clientes*/
);

export default routesClients;
