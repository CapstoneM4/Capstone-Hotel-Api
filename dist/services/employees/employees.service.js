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
const employees_entities_1 = require("../../entities/employees.entities");
const bcryptjs_1 = require("bcryptjs");
const systemHotel_entities_1 = require("../../entities/systemHotel.entities");
class EmployeesServices {
    static createEmploeeys(id, { name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = data_source_1.default.getRepository(employees_entities_1.Employees);
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const findUser = yield employeeRepository.findOne({
                where: {
                    email: email,
                },
            });
            if (findUser) {
                throw new AppError_1.AppError(400, "User already registered!");
            }
            const hotel = yield hotelRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!hotel) {
                throw new AppError_1.AppError(404, "Hotel not found");
            }
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
            const employee = employeeRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            employee.hotel = hotel;
            yield employeeRepository.save(employee);
            const employeeResponse = yield employeeRepository
                .createQueryBuilder("employee")
                .where("employee.email = :email", { email: email })
                .select("employee.id")
                .addSelect("employee.name")
                .addSelect("employee.email")
                .addSelect("employee.hotel")
                .addSelect("employee.isAdm")
                .addSelect("employee.isActive")
                .getMany();
            return employeeResponse;
        });
    }
    static listEmployees(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotelRepository = data_source_1.default.getRepository(systemHotel_entities_1.Hotel);
            const findHotel = yield hotelRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!findHotel) {
                throw new AppError_1.AppError(404, "Hotel not found!");
            }
            return findHotel.employees;
        });
    }
}
exports.default = EmployeesServices;
