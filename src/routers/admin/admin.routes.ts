import { Router } from "express";
import EmployeesControllers from "../../controllers/employees/employees.controllers";
import HotelController from "../../controllers/hotel/hotel.controllers";
import JobTitleController from "../../controllers/jobTitle/JobTitle.controller";

const routesADM = Router();

//======HOTEL
// Listagem e Criação de hotéis no banco de dados
routesADM.post(
  "",
  HotelController.createHotel /*Controller de criação do hotel*/
);
routesADM.get(
  "",
  HotelController.listHotel /*Controller de listagem dos hotéis*/
);

//Alterações de dados do hotel no banco de dados
routesADM.patch(
  "/:id",
  HotelController.updateHotel /*Controller de alteração de dados do hotel*/
);
routesADM.delete(
  "/:id",
  HotelController.deleteHotel /*Controller de deleção do hotel*/
);
routesADM.get(
  "/:id",
  HotelController.listHotelById /*Controller de listagem do hotel*/
);

//========CARGOS
//Criação e listagem de cargos
routesADM.post(
  "/:id/jobtitles",
  JobTitleController.create /*Controller de criação de cargos do hotel*/
);
routesADM.get(
  "/:id/jobtitles",
  JobTitleController.listOne /*Controller de listagem dos cargos do hotel*/
);

//Alterações de dados nos cargos
routesADM.get(
  "/jobtitles",
  JobTitleController.listOne /*Controller de listagem do cargo do hotel*/
);
routesADM.patch(
  "/:id/jobtitles",
  JobTitleController.update /*Controller de alteração de dados do cargo no hotel*/
);
routesADM.delete(
  "/:id/jobtitles",
  JobTitleController.delete /*Controller de deleção de dados do cargo no hotel*/
);

//============== ROOMS
//Criação e listagem dos quartos do hotel
routesADM.get(
  "/rooms/:id",
  RoomsControllers.listRooms /*Controller de listagem dos quartos do hotel*/
);
routesADM.post(
  "/rooms/:id",
  RoomsControllers.createRooms /*Controller de criação do quarto do hotel*/
);

//Alterações de dados dos quartos
routesADM.get(
  "/:id/rooms",
  RoomsControllers.listRoomsByid /*Controller de listagem do quarto do hotel*/
);
routesADM.patch(
  "/rooms/:id",
  RoomsControllers.updateRoom /*Controller de alterações de dados do quarto do hotel*/
);
routesADM.delete(
  "/rooms/:id",
  RoomsControllers.deleteRoom /*Controller de deleção do quarto do hotel*/
);

//=========== EMPLOYEES
//Criação de funcionários
routesADM.post(
  "/employees/:id",
  EmployeesControllers.createEmployees /*faltando id do hotel ex: "/:id/employees" */
);
routesADM.get(
  "/employees/:id",
  EmployeesControllers.listEmployees /*Controller de listagem dos funcionários do hotel*/
);
routesADM.patch(
  "/employees/:id",
  EmployeesControllers.updateEmployee /*Atualizar dados do funcionario */
);
routesADM.get(
  "/:id/employees",
  EmployeesControllers.listEmployeesByHotel /*Controller de listagem dos funcionários do hotel*/
);
// routesADM.patch(
//   "/:id/employees",
//   EmployeesControllers.listEmployeesByHotel /*Controller de listagem dos funcionários do hotel*/
// );

export default routesADM;
