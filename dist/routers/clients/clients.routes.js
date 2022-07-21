"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = __importDefault(require("../../controllers/clients"));
const routesClients = (0, express_1.Router)();
routesClients.post("", clients_1.default.CreateClients /*Controller de criação de clientes*/);
routesClients.get("", clients_1.default.ListAllClients /*Controller de listagem dos clientes*/);
routesClients.get("/:id", clients_1.default.ListOneClient /*Controller de listagem de clientes*/);
exports.default = routesClients;
