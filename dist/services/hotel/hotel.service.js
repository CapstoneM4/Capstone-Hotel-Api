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
const AppError_1 = require("../../errors/AppError");
const systemHotel_entities_1 = require("../../entities/systemHotel.entities");
const rooms_entities_1 = require("../../entities/rooms.entities");
class HotelServices {
    static createHotelService({ name, qtyBedRooms, cnpj, address, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const roomsRepository = data_source_1.default.getRepository(rooms_entities_1.Rooms);
            const hotels = yield hotelRepository.findOne({ where: { cnpj } });
            if (hotels) {
                throw new AppError_1.AppError(403, "Invalid credentials");
            }
            const rooms = yield roomsRepository.find();
            const hotel = new systemHotel_entities_1.Hotel();
            hotel.name = name;
            hotel.qtyBedRooms = qtyBedRooms;
            hotel.cnpj = cnpj;
            hotel.address = address;
            hotel.rooms = rooms;
            hotelRepository.create(hotel);
            yield hotelRepository.save(hotel);
            return hotel;
        });
    }
    //list All
    static listHotelsService() {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const hotelList = yield hotelRepository.find();
            return hotelList;
        });
    }
    //listById
    static listByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const hotel = yield hotelRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!hotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            return hotel;
        });
    }
    //updateHotel
    static updateHotelService(id, { name, qtyBedRooms, address }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const hotel = yield hotelRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!hotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            else if (hotel.name === name) {
                throw new AppError_1.AppError(400, "Name already in use!");
            }
            else if (hotel.qtyBedRooms === qtyBedRooms) {
                throw new AppError_1.AppError(400, `Hotel already has ${qtyBedRooms} Bedrooms!`);
            }
            else if (hotel.address === address) {
                throw new AppError_1.AppError(400, `Hotel already registered in ${address}!`);
            }
            name
                ? yield hotelRepository
                    .createQueryBuilder()
                    .update(systemHotel_entities_1.Hotel)
                    .set({ name: name })
                    .where("id = :id", { id: id })
                    .execute()
                : qtyBedRooms
                    ? yield hotelRepository
                        .createQueryBuilder()
                        .update(systemHotel_entities_1.Hotel)
                        .set({ qtyBedRooms: qtyBedRooms })
                        .where("id = :id", { id: id })
                        .execute()
                    : address &&
                        (yield hotelRepository
                            .createQueryBuilder()
                            .update(systemHotel_entities_1.Hotel)
                            .set({ address: address })
                            .where("id = :id", { id: id })
                            .execute());
            return true;
        });
    }
    //deleteById
    static deleteHotelService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const hotel = yield hotelRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!hotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            if (hotel.rooms.length > 0) {
                throw new AppError_1.AppError(403, "Hotel has rooms registered");
            }
            yield hotelRepository
                .createQueryBuilder()
                .delete()
                .from(systemHotel_entities_1.Hotel)
                .where("id = :id", { id: id })
                .execute();
            return true;
        });
    }
}
exports.default = HotelServices;
