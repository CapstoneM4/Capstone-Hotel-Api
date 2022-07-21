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
const clients_entities_1 = require("../../entities/clients.entities");
const booking_entities_1 = require("../../entities/booking.entities");
const AppError_1 = require("../../errors/AppError");
class ClientsHotelServices {
    //LIST
    static ClientsList() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ClientsRepository.find();
            return users;
        });
    }
    //LIST FILTER ID
    static ClientsFilter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.ClientsRepository.find();
            const user = users.find((user) => user.id === id);
            console.log(user);
            if (!user) {
                throw new AppError_1.AppError(404, "User not exists");
            }
            return user;
        });
    }
    //CREATE
    static ClientsCreate({ name, email, personalId, cell, isAlocated, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ClientsList = yield this.ClientsRepository.find();
            const clientsAlreadyExistsId = ClientsList.find((user) => user.personalId === personalId);
            const clientsAlreadyExistsEmail = ClientsList.find((user) => user.email === email);
            const booking = yield this.BookingRepository.find();
            const clientsRepository = data_source_1.default.getRepository(clients_entities_1.Clients);
            const cl = yield clientsRepository.findOne({
                where: {
                    cell: cell,
                },
            });
            if (clientsAlreadyExistsId || clientsAlreadyExistsEmail) {
                throw new AppError_1.AppError(400, "Client already registered");
            }
            if (cl) {
                throw new AppError_1.AppError(400, "Cell alredy registered");
            }
            const clients = new clients_entities_1.Clients();
            clients.name = name;
            clients.email = email;
            clients.personalId = personalId;
            clients.cell = cell;
            clients.isAlocated = isAlocated;
            clients.booking = booking;
            this.ClientsRepository.create(clients);
            this.ClientsRepository.save(clients);
            return clients;
        });
    }
}
ClientsHotelServices.ClientsRepository = data_source_1.default.getRepository(clients_entities_1.Clients);
ClientsHotelServices.BookingRepository = data_source_1.default.getRepository(booking_entities_1.Booking);
exports.default = ClientsHotelServices;
