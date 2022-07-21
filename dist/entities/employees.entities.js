"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = void 0;
const typeorm_1 = require("typeorm");
const bookingServices_1 = require("./bookingServices");
const systemHotel_entities_1 = require("./systemHotel.entities");
const jobTitles_entities_1 = require("./jobTitles.entities");
let Employees = class Employees {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Employees.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Employees.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Employees.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], Employees.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isAdm", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Employees.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => bookingServices_1.BookingService, (bookingService) => bookingService.employee),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Employees.prototype, "bookingService", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => systemHotel_entities_1.Hotel, (hotel) => hotel.booking),
    __metadata("design:type", systemHotel_entities_1.Hotel)
], Employees.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobTitles_entities_1.JobTitles, { eager: true, cascade: true }),
    __metadata("design:type", jobTitles_entities_1.JobTitles)
], Employees.prototype, "jobTitles", void 0);
Employees = __decorate([
    (0, typeorm_1.Entity)("Employees")
], Employees);
exports.Employees = Employees;
