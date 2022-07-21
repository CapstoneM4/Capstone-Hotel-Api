"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../errors/AppError");
const handleAppErrorMiddleware = (error, req, res, _) => {
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message: "Internal server error",
    });
};
exports.default = handleAppErrorMiddleware;
