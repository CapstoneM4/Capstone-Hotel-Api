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
const employees_services_1 = __importDefault(require("../../services/employees/employees.services"));
class EmployeesControllers {
    static createEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const { id } = req.params;
            const newEmployee = yield employees_services_1.default.createEmploeeys(id, {
                name,
                email,
                password,
            });
            return res.status(201).json(newEmployee);
        });
    }
    static listEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const employee = yield employees_services_1.default.listEmployees(id);
            return res.status(200).json(employee);
        });
    }
    static listEmployeesByHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const list = yield employees_services_1.default.listEmployeesByHotel(id);
            return res.status(200).json(list);
        });
    }
    static updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const newId = parseInt(id);
            const { name, email, password, isAdm, isActive } = req.body;
            const updated = yield employees_services_1.default.updateEmployee(newId, {
                name,
                email,
                password,
                isAdm,
                isActive,
            });
            return res.status(200).json({
                message: "Updated with success!",
            });
        });
    }
}
exports.default = EmployeesControllers;
