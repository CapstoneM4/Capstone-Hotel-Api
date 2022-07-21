"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const booking_entities_1 = require("../../entities/booking.entities");
const typeorm_1 = require("typeorm");
const systemHotel_entities_1 = require("../../entities/systemHotel.entities");
const clients_entities_1 = require("../../entities/clients.entities");
const rooms_entities_1 = require("../../entities/rooms.entities");
const AppError_1 = require("../../errors/AppError");
const services_entities_1 = require("../../entities/services.entities");
const employees_entities_1 = require("../../entities/employees.entities");
const bookingServices_1 = require("../../entities/bookingServices");
class BookingServiceClass {
    static createBooking({ isPaid, qtyClients, idHotel, idClient, idRoom, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelList = yield this.hotelRepository.find();
            const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);
            const clientList = yield this.clientRepository.find();
            const clientExists = clientList.find((client) => client.id === idClient);
            const roomtList = yield this.roomRepository.find();
            const roomExists = roomtList.find((room) => room.id === idRoom);
            if (!hotelExists) {
                throw new AppError_1.AppError(404, "Hotel Doesn't Exists");
            }
            if (!clientExists) {
                throw new AppError_1.AppError(404, "Client Doesn't Exists");
            }
            if (!roomExists) {
                throw new AppError_1.AppError(404, "Room Doesn't Exists");
            }
            const newBooking = new booking_entities_1.Booking();
            newBooking.checkinDate = new Date();
            newBooking.checkoutDate = new Date();
            newBooking.isPaid = isPaid;
            newBooking.qtyClients = qtyClients;
            newBooking.hotel = hotelExists;
            newBooking.client = clientExists;
            newBooking.room = roomExists;
            this.bookingRepository.create(newBooking);
            yield this.bookingRepository.save(newBooking);
            return newBooking;
        });
    }
    static listBookings({ idHotel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelList = yield this.hotelRepository.find();
            const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);
            if (!hotelExists) {
                throw new AppError_1.AppError(404, "Hotel Doesn't Exists");
            }
            const hotelBookings = yield this.bookingRepository.findBy({
                hotel: (0, typeorm_1.Equal)(idHotel),
            });
            if (hotelBookings.length < 1) {
                throw new AppError_1.AppError(404, "Couldn't find any room associate to this hotel");
            }
            return hotelBookings;
        });
    }
    static updateBooking({ idBooking, checkinDate, checkoutDate, isPaid, qtyClients, idHotel, idClient, idRoom, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelList = yield this.hotelRepository.find();
            const hotelExists = hotelList.find((hotel) => hotel.id === idHotel);
            const clientList = yield this.clientRepository.find();
            const clientExists = clientList.find((client) => client.id === idClient);
            const roomtList = yield this.roomRepository.find();
            const roomExists = roomtList.find((room) => room.id === idRoom);
            const bookings = yield this.bookingRepository.find();
            const bookingToUpdate = bookings.find((booking) => booking.id === idBooking);
            if (!hotelExists) {
                throw new AppError_1.AppError(404, "Hotel Doesn't Exists");
            }
            if (!clientExists) {
                throw new AppError_1.AppError(404, "Client Doesn't Exists");
            }
            if (!roomExists) {
                throw new AppError_1.AppError(404, "Room Doesn't Exists");
            }
            if (!bookingToUpdate) {
                throw new AppError_1.AppError(404, "Couldn't find booking");
            }
            if (checkinDate) {
                bookingToUpdate.checkinDate = new Date(checkinDate);
            }
            if (checkoutDate) {
                bookingToUpdate.checkoutDate = new Date(checkoutDate);
            }
            if (isPaid != undefined) {
                bookingToUpdate.isPaid = isPaid;
            }
            if (qtyClients) {
                bookingToUpdate.qtyClients = qtyClients;
            }
            if (idHotel) {
                bookingToUpdate.hotel = hotelExists;
            }
            if (idClient) {
                bookingToUpdate.client = clientExists;
            }
            if (idRoom) {
                bookingToUpdate.room = roomExists;
            }
            yield this.bookingRepository.update(bookingToUpdate.id, bookingToUpdate);
            return bookingToUpdate;
        });
    }
    static deleteBooking({ idBooking }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.bookingRepository.find();
            const deleteBooking = bookings.find((booking) => booking.id === idBooking);
            if (!deleteBooking) {
                throw new AppError_1.AppError(404, "Couldn't find booking");
            }
            yield this.bookingRepository.delete(deleteBooking.id);
            return true;
        });
    }
    static listOneBooking({ idBooking }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.bookingRepository.find();
            const booking = bookings.find((booking) => booking.id === idBooking);
            if (!booking) {
                throw new AppError_1.AppError(404, "Couldn't find booking");
            }
            return booking;
        });
    }
    static createBookingService({ idService, idEmployee, idBooking, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookings = yield this.bookingRepository.find();
            const services = yield this.servicesRepository.find();
            const employees = yield this.employeeRepository.find();
            const booking = bookings.find((booking) => booking.id === idBooking);
            const service = services.find((service) => service.id === idService);
            const employee = employees.find((employee) => employee.id === idEmployee);
            if (!booking) {
                throw new AppError_1.AppError(404, "Couldn't find booking");
            }
            if (!service) {
                throw new AppError_1.AppError(404, "Couldn't find service");
            }
            if (!employee) {
                throw new AppError_1.AppError(404, "Couldn't find employee");
            }
            const newBookingService = new bookingServices_1.BookingService();
            newBookingService.service = service;
            newBookingService.employee = employee;
            newBookingService.booking = booking;
            this.bookingServiceRepository.create(newBookingService);
            yield this.bookingServiceRepository.save(newBookingService);
            return newBookingService;
        });
    }
    static listBookingServices({ idBooking }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingServicesAll = yield this.bookingServiceRepository.find();
            const bookingServices = bookingServicesAll.filter((bookingService) => bookingService.booking.id == idBooking);
            if (!bookingServices) {
                throw new AppError_1.AppError(404, "Couldn't find any room service to this booking");
            }
            return bookingServicesAll;
        });
    }
}
BookingServiceClass.bookingRepository = data_source_1.default.getRepository(booking_entities_1.Booking);
BookingServiceClass.hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
BookingServiceClass.clientRepository = data_source_1.default.getRepository(clients_entities_1.Clients);
BookingServiceClass.roomRepository = data_source_1.default.getRepository(rooms_entities_1.Rooms);
BookingServiceClass.servicesRepository = data_source_1.default.getRepository(services_entities_1.Services);
BookingServiceClass.employeeRepository = data_source_1.default.getRepository(employees_entities_1.Employees);
BookingServiceClass.bookingServiceRepository = data_source_1.default.getRepository(bookingServices_1.BookingService);
exports.default = BookingServiceClass;
