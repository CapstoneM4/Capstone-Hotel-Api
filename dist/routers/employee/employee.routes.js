"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicesHotel_1 = __importDefault(require("../../controllers/servicesHotel"));
const booking_controllers_1 = __importDefault(require("../../controllers/booking/booking.controllers"));
const routesEmployee = (0, express_1.Router)();
//Criação de booking
routesEmployee.post("/:id/booking", booking_controllers_1.default.createBooking /*Controller de criação do booking do hotel */);
routesEmployee.get("/:id/booking", booking_controllers_1.default.listHotelBookings /*Controller de listagem dos bookings do hotel */);
//Alteração de dados do booking
routesEmployee.patch("/:id/booking/:idBooking", booking_controllers_1.default.updateHotelBooking /*Controller de alteração de dados do booking*/);
routesEmployee.get("/booking/:idBooking", booking_controllers_1.default.listOneBooking /*Controller de listagem de dados do booking*/);
routesEmployee.delete("/booking/:idBooking", booking_controllers_1.default.deleteHotelBooking /*Controller de deleção do booking*/);
//Criação dos booking service
routesEmployee.get("/:id/booking/:idBooking/service", booking_controllers_1.default.listBookingServices /*Controller de listagem de dados do booking service*/);
routesEmployee.post("/:id/booking/:idBooking/service", booking_controllers_1.default.createBookingService /*Controller de criação de dados do booking service*/);
//Criação de services no banco de dados
routesEmployee.get("", servicesHotel_1.default.list
/*Controller de listagem de dados dos services*/
);
routesEmployee.post("", servicesHotel_1.default.create /*Controller de criação de dados dos services*/);
//Listagem dos services
routesEmployee.get("/:id", servicesHotel_1.default.listOne
/*Controller de listagem de dados do service*/
);
exports.default = routesEmployee;
