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
const servicesHotel_1 = __importDefault(require("../../services/servicesHotel"));
class ServicesHotelController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price } = req.body;
            const servicesHotelCreate = yield servicesHotel_1.default.CreateServicesHotel({
                name,
                description,
                price,
            });
            return res.status(201).send(servicesHotelCreate);
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAll = yield servicesHotel_1.default.ListServServices();
            return res.status(200).send(listAll);
        });
    }
    static listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const numberId = parseInt(id);
            const listAll = yield servicesHotel_1.default.ListOneServices(numberId);
            return res.status(200).send(listAll);
        });
    }
}
exports.default = ServicesHotelController;
