"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controllers_1 = __importDefault(require("../../controllers/employees/employees.controllers"));
const hotel_controllers_1 = __importDefault(require("../../controllers/hotel/hotel.controllers"));
const JobTitle_controller_1 = __importDefault(require("../../controllers/jobTitle/JobTitle.controller"));
const rooms_controllers_1 = __importDefault(require("../../controllers/rooms/rooms.controllers"));
const routesADM = (0, express_1.Router)();
//======HOTEL
// Listagem e Criação de hotéis no banco de dados
routesADM.post("", hotel_controllers_1.default.createHotel /*Controller de criação do hotel*/);
routesADM.get("", hotel_controllers_1.default.listHotel /*Controller de listagem dos hotéis*/);
//Alterações de dados do hotel no banco de dados
routesADM.patch("/:id", hotel_controllers_1.default.updateHotel /*Controller de alteração de dados do hotel*/);
routesADM.delete("/:id", hotel_controllers_1.default.deleteHotel /*Controller de deleção do hotel*/);
routesADM.get("/:id", hotel_controllers_1.default.listHotelById /*Controller de listagem do hotel*/);
//========CARGOS
//Criação e listagem de cargos
routesADM.post("/:id/jobtitles", JobTitle_controller_1.default.create /*Controller de criação de cargos do hotel*/);
routesADM.get("/:id/jobtitles", JobTitle_controller_1.default.listOne /*Controller de listagem dos cargos do hotel*/);
//Alterações de dados nos cargos
routesADM.get("/jobtitles", JobTitle_controller_1.default.listOne /*Controller de listagem do cargo do hotel*/);
routesADM.patch("/:id/jobtitles", JobTitle_controller_1.default.update /*Controller de alteração de dados do cargo no hotel*/);
routesADM.delete("/:id/jobtitles", JobTitle_controller_1.default.delete /*Controller de deleção de dados do cargo no hotel*/);
//============== ROOMS
//Criação e listagem dos quartos do hotel
routesADM.get("/rooms/:id", rooms_controllers_1.default.listRooms /*Controller de listagem dos quartos do hotel*/);
routesADM.post("/rooms/:id", rooms_controllers_1.default.createRooms /*Controller de criação do quarto do hotel*/);
//Alterações de dados dos quartos
routesADM.get("/:id/rooms", rooms_controllers_1.default.listRoomsByid /*Controller de listagem do quarto do hotel*/);
routesADM.patch("/rooms/:id", rooms_controllers_1.default.updateRoom /*Controller de alterações de dados do quarto do hotel*/);
routesADM.delete("/rooms/:id", rooms_controllers_1.default.deleteRoom /*Controller de deleção do quarto do hotel*/);
//=========== EMPLOYEES
//Criação de funcionários
routesADM.post("/employees/:id", employees_controllers_1.default.createEmployees /*faltando id do hotel ex: "/:id/employees" */);
routesADM.get("/employees/:id", employees_controllers_1.default.listEmployees /*Controller de listagem dos funcionários do hotel*/);
routesADM.patch("/employees/:id", employees_controllers_1.default.updateEmployee /*Atualizar dados do funcionario */);
routesADM.get("/:id/employees", employees_controllers_1.default.listEmployeesByHotel /*Controller de listagem dos funcionários do hotel*/);
// routesADM.patch(
//   "/:id/employees",
//   EmployeesControllers.listEmployeesByHotel /*Controller de listagem dos funcionários do hotel*/
// );
exports.default = routesADM;
