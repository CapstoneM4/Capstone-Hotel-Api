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
exports.Rooms = void 0;
const typeorm_1 = require("typeorm");
const booking_entities_1 = require("./booking.entities");
const uuid_1 = require("uuid");
const systemHotel_entities_1 = require("./systemHotel.entities");
const roomsType_entities_1 = require("./roomsType.entities");
let Rooms = class Rooms {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Rooms.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Rooms.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Rooms.prototype, "floorNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], Rooms.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Rooms.prototype, "isClean", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Rooms.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => systemHotel_entities_1.Hotel, (hotel) => hotel.rooms),
    __metadata("design:type", systemHotel_entities_1.Hotel)
], Rooms.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entities_1.Booking, (booking) => booking.room),
    __metadata("design:type", Array)
], Rooms.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => roomsType_entities_1.RoomType, (roomType) => roomType.rooms, { eager: true }),
    __metadata("design:type", roomsType_entities_1.RoomType)
], Rooms.prototype, "roomType", void 0);
Rooms = __decorate([
    (0, typeorm_1.Entity)("Rooms"),
    __metadata("design:paramtypes", [])
], Rooms);
exports.Rooms = Rooms;
