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
exports.Services = void 0;
const typeorm_1 = require("typeorm");
const bookingServices_1 = require("./bookingServices");
let Services = class Services {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Services.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Services.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 400 }),
    __metadata("design:type", String)
], Services.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2 }),
    __metadata("design:type", Number)
], Services.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => bookingServices_1.BookingService, (bookingService) => bookingService.service),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Services.prototype, "bookingService", void 0);
Services = __decorate([
    (0, typeorm_1.Entity)("Services")
], Services);
exports.Services = Services;
