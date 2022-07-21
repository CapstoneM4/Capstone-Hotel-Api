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
const bcryptjs_1 = require("bcryptjs");
const systemHotel_entities_1 = require("../../entities/systemHotel.entities");
const employees_entities_1 = require("../../entities/employees.entities");
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
            const employeeRepository = data_source_1.default.getRepository(employees_entities_1.Employees);
            const employee = yield employeeRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!employee) {
                throw new AppError_1.AppError(404, "Employee not found!");
            }
            const join = yield employeeRepository
                .createQueryBuilder("employee")
                .leftJoinAndSelect("employee.hotel", "hotel")
                .leftJoinAndSelect("employee.jobTitles", "jobTitles")
                .where("employee.id = :id", { id: id })
                .getOne();
            let response = {};
            if ((join === null || join === void 0 ? void 0 : join.jobTitles) == null) {
                response = {
                    id: join.id,
                    name: join.name,
                    email: join.email,
                    isAdm: join.isAdm,
                    isActive: join.isActive,
                    hotel: {
                        id: join.hotel.id,
                        name: join.hotel.name,
                        qtyBedRooms: join.hotel.qtyBedRooms,
                        cnpj: join.hotel.cnpj,
                        address: join.hotel.address,
                    },
                    jobTitle: {
                        message: "Job yet not defined!",
                    },
                };
            }
            else if ((join === null || join === void 0 ? void 0 : join.jobTitles) != null) {
                response = {
                    id: join.id,
                    name: join.name,
                    email: join.email,
                    isAdm: join.isAdm,
                    isActive: join.isActive,
                    hotel: {
                        id: join.hotel.id,
                        name: join.hotel.name,
                        qtyBedRooms: join.hotel.qtyBedRooms,
                        cnpj: join.hotel.cnpj,
                        address: join.hotel.address,
                    },
                    jobTitle: {
                        name: join.jobTitles.name,
                        description: join.jobTitles.description,
                    },
                };
            }
            return response;
        });
    }
    static listEmployeesByHotel(id) {
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
            return hotel.employees;
        });
    }
    static updateEmployee(id, { name, email, password, isAdm, isActive }) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = data_source_1.default.getRepository(employees_entities_1.Employees);
            const employeeList = yield employeeRepository.find();
            const employee = employeeList.find((e) => Number(e.id) === id);
            if (!employee) {
                throw new AppError_1.AppError(404, "Employee not found!");
            }
            else if (employee.name === name) {
                throw new AppError_1.AppError(400, `Employee alredy has ${name} registered!`);
            }
            else if (employee.email === email) {
                throw new AppError_1.AppError(400, `Employee already has ${email} registered!`);
            }
            else if (employee.password === password) {
                throw new AppError_1.AppError(400, "Employee already has this password registered!");
            }
            else if (employee.isAdm === isAdm) {
                throw new AppError_1.AppError(400, `Employee already has ${isAdm} status!`);
            }
            else if (employee.isActive === isActive) {
                throw new AppError_1.AppError(400, `Employee already has ${isActive}} status!`);
            }
            isAdm != undefined ? (employee.isAdm = isAdm) : isAdm;
            isActive != undefined ? (employee.isActive = isActive) : isActive;
            name ? (employee.name = name) : name;
            email ? (employee.email = email) : email;
            password ? (employee.password = yield (0, bcryptjs_1.hash)(password, 10)) : password;
            yield employeeRepository.update(employee.id, employee);
            return true;
        });
    }
}
exports.default = EmployeesServices;
