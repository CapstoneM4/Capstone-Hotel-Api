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
exports.Clients = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const booking_entities_1 = require("./booking.entities");
let Clients = class Clients {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Clients.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Clients.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Clients.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Clients.prototype, "personalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 11, unique: true }),
    __metadata("design:type", String)
], Clients.prototype, "cell", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Clients.prototype, "isAlocated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entities_1.Booking, (booking) => booking.client, { eager: true }),
    __metadata("design:type", Array)
], Clients.prototype, "booking", void 0);
Clients = __decorate([
    (0, typeorm_1.Entity)("Clients"),
    __metadata("design:paramtypes", [])
], Clients);
exports.Clients = Clients;
