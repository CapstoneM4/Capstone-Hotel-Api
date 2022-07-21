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
const services_entities_1 = require("../../entities/services.entities");
const AppError_1 = require("../../errors/AppError");
class ServicesHotelService {
    static services() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.servicesRepository.find();
        });
    }
    // CREATE
    static CreateServicesHotel({ name, description, price, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ServicesList = yield this.services();
            const ServicesAlreadyExists = ServicesList.find((service) => service.name === name);
            if (ServicesAlreadyExists) {
                throw new AppError_1.AppError(400, "Services already exists on this hotel");
            }
            const services = new services_entities_1.Services();
            services.name = name;
            services.description = description;
            services.price = price;
            this.servicesRepository.create(services);
            this.servicesRepository.save(services);
            return services;
        });
    }
    //LIST ALL
    static ListServServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const allServices = this.services();
            return allServices;
        });
    }
    //LIST ONE
    static ListOneServices(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicesList = yield this.services();
            const servicesOne = servicesList.find((service) => service.id === id);
            if (!servicesOne) {
                throw new AppError_1.AppError(404, "Services not found");
            }
            return servicesOne;
        });
    }
}
ServicesHotelService.servicesRepository = data_source_1.default.getRepository(services_entities_1.Services);
exports.default = ServicesHotelService;
