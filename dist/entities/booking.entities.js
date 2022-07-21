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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const systemHotel_entities_1 = require("./systemHotel.entities");
const clients_entities_1 = require("./clients.entities");
const bookingServices_1 = require("./bookingServices");
const rooms_entities_1 = require("./rooms.entities");
let Booking = class Booking {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "checkinDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "checkoutDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Booking.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "qtyClients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookingServices_1.BookingService, (bookingService) => bookingService.booking),
    __metadata("design:type", Array)
], Booking.prototype, "bookingService", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => systemHotel_entities_1.Hotel, (hotel) => hotel.booking),
    __metadata("design:type", systemHotel_entities_1.Hotel)
], Booking.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entities_1.Clients, (client) => client.booking),
    __metadata("design:type", clients_entities_1.Clients)
], Booking.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rooms_entities_1.Rooms, (room) => room.booking, { eager: true }),
    __metadata("design:type", rooms_entities_1.Rooms)
], Booking.prototype, "room", void 0);
Booking = __decorate([
    (0, typeorm_1.Entity)("Booking"),
    __metadata("design:paramtypes", [])
], Booking);
exports.Booking = Booking;
