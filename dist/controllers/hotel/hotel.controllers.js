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
const hotel_service_1 = __importDefault(require("../../services/hotel/hotel.service"));
class HotelControllers {
    static createHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, qtyBedRooms, cnpj, address } = req.body;
            const newHotel = yield hotel_service_1.default.createHotelService({
                name,
                qtyBedRooms,
                cnpj,
                address,
            });
            return res.status(201).send(newHotel);
        });
    }
    static listHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listDb = yield hotel_service_1.default.listHotelsService();
            return res.status(201).json(listDb);
        });
    }
    static listHotelById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const list = yield hotel_service_1.default.listByIdService(id);
            return res.status(200).json(list);
        });
    }
    static updateHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { qtyBedRooms, address, name } = req.body;
            const updated = yield hotel_service_1.default.updateHotelService(id, {
                name,
                qtyBedRooms,
                address,
            });
            return res.status(200).json({
                message: "Updated with success!",
            });
        });
    }
    static deleteHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield hotel_service_1.default.deleteHotelService(id);
            return res.status(200).json({
                message: "Deleted with success",
            });
        });
    }
}
exports.default = HotelControllers;
