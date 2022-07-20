import { Router } from "express";

const routesClients = Router();

routesClients.post("" /*Controller de criação de clientes*/);
routesClients.get("" /*Controller de listagem dos clientes*/);
routesClients.get("/:id" /*Controller de listagem de clientes por id*/);

export default routesClients;
