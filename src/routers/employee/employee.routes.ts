import { Router } from "express";

const routesEmployee = Router();

import BookingController from "../../controllers/booking";

//Criação de booking
routesEmployee.post(
  "/:id/booking",
  BookingController.createBooking /*Controller de criação do booking do hotel */
);

routesEmployee.get(
  "/:id/booking",
  BookingController.listHotelBookings /*Controller de listagem dos bookings do hotel */
);

//Alteração de dados do booking
routesEmployee.patch(
  "/:id/booking/:idBooking",
  BookingController.updateHotelBooking /*Controller de alteração de dados do booking*/
);
routesEmployee.get(
  "/:id/booking/:idBooking",
  BookingController.listOneBooking /*Controller de listagem de dados do booking*/
);
routesEmployee.delete(
  "/:id/booking/:idBooking",
  BookingController.deleteHotelBooking /*Controller de deleção do booking*/
);

//Criação dos booking service

routesEmployee.get(
  "/:id/booking/:id/service" /*Controller de listagem de dados do booking service*/
);

routesEmployee.post(
  "/:id/booking/:id/service" /*Controller de criação de dados do booking service*/
);

//Criação de services no banco de dados
routesEmployee.get("" /*Controller de listagem de dados dos services*/);
routesEmployee.post("" /*Controller de criação de dados dos services*/);

//Listagem dos services
routesEmployee.get("/:id" /*Controller de listagem de dados do service*/);

export default routesEmployee;
