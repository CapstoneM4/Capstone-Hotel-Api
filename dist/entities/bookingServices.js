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
exports.BookingService = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const services_entities_1 = require("./services.entities");
const employees_entities_1 = require("./employees.entities");
const booking_entities_1 = require("./booking.entities");
let BookingService = class BookingService {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], BookingService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => services_entities_1.Services, (services) => services.bookingService),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], BookingService.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => employees_entities_1.Employees, (employees) => employees.bookingService),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], BookingService.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_entities_1.Booking, (booking) => booking.bookingService),
    __metadata("design:type", booking_entities_1.Booking)
], BookingService.prototype, "booking", void 0);
BookingService = __decorate([
    (0, typeorm_1.Entity)("BookingService"),
    __metadata("design:paramtypes", [])
], BookingService);
exports.BookingService = BookingService;
