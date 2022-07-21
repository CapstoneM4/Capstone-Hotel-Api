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
const rooms_service_1 = __importDefault(require("../../services/rooms/rooms.service"));
class RoomsControllers {
    static createRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roomNumber, floorNumber, price, isClean, isAvailable } = req.body;
            const { id } = req.params;
            const newRomm = yield rooms_service_1.default.createRoomService(id, {
                roomNumber,
                floorNumber,
                price,
                isClean,
                isAvailable,
            });
            return res.status(200).json(newRomm);
        });
    }
    static listRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const hotelRooms = yield rooms_service_1.default.listRoomsService(id);
            return res.status(200).json(hotelRooms);
        });
    }
    static listRoomsByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const room = yield rooms_service_1.default.listRoomByIdService(id);
            return res.status(200).json(room);
        });
    }
    static updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { price, isClean, isAvailable } = req.body;
            const updated = yield rooms_service_1.default.updateRoomService(id, {
                price,
                isClean,
                isAvailable,
            });
            return res.status(200).json({
                message: "Updated with success!",
            });
        });
    }
    static deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield rooms_service_1.default.deleteRoomService(id);
            return res.status(200).json({
                message: "Deleted with success!",
            });
        });
    }
}
exports.default = RoomsControllers;
