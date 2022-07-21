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
class RoomsServices {
    static createRoomService(hotelId, { roomNumber, floorNumber, price, isClean, isAvailable }) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomsRepository = data_source_1.default.getTreeRepository(rooms_entities_1.Rooms);
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const hotel = yield hotelRepository.findOne({
                where: {
                    id: hotelId,
                },
            });
            if (!hotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            const newRoom = roomsRepository.create({
                roomNumber,
                floorNumber,
                price,
                isClean,
                isAvailable,
            });
            newRoom.hotel = hotel;
            yield roomsRepository.save(newRoom);
            return newRoom;
        });
    }
    static listRoomsService(hotelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const findHotel = yield hotelRepository.findOne({
                where: {
                    id: hotelId,
                },
            });
            if (!findHotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            return findHotel.rooms;
        });
    }
    static listRoomByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomsRepository = data_source_1.default.getRepository(rooms_entities_1.Rooms);
            const room = yield roomsRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!room) {
                throw new AppError_1.AppError(404, "Room not found!");
            }
            return room;
        });
    }
    static updateRoomService(id, { price, isClean, isAvailable }) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomsRepository = data_source_1.default.getRepository(rooms_entities_1.Rooms);
            const room = yield roomsRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!room) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            else if (room.price == price) {
                throw new AppError_1.AppError(400, `Room price already is ${price}!`);
            }
            else if (room.isClean === isClean) {
                throw new AppError_1.AppError(404, `Room already has ${isClean} status!`);
            }
            else if (room.isAvailable === isAvailable) {
                throw new AppError_1.AppError(404, `Room already has ${isAvailable} status!`);
            }
            isClean != undefined ? (room.isClean = isClean) : isClean;
            isAvailable != undefined ? (room.isAvailable = isAvailable) : isAvailable;
            price ? (room.price = price) : price;
            yield roomsRepository.update(room.id, room);
            return true;
        });
    }
    static deleteRoomService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomsRepository = data_source_1.default.getRepository(rooms_entities_1.Rooms);
            const room = yield roomsRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!room) {
                throw new AppError_1.AppError(404, "Room not found!");
            }
            yield roomsRepository
                .createQueryBuilder()
                .delete()
                .from(rooms_entities_1.Rooms)
                .where("id = :id", { id: id })
                .execute();
            return true;
        });
    }
}
exports.default = RoomsServices;
