"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("reflect-metadata");
const admin_routes_1 = __importDefault(require("./routers/admin/admin.routes"));
const clients_routes_1 = __importDefault(require("./routers/clients/clients.routes"));
const employee_routes_1 = __importDefault(require("./routers/employee/employee.routes"));
const handleAppError_middleware_1 = __importDefault(require("./middlewares/handleAppError.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/hotel", admin_routes_1.default, employee_routes_1.default);
app.use("/service", employee_routes_1.default);
app.use("/clients", clients_routes_1.default);
app.use(handleAppError_middleware_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log("App runing");
});
exports.default = app;
