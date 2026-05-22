"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const AppError_1 = __importDefault(require("../../shared/errors/AppError"));
class ErrorHandler {
    static handle(err, _, response, __) {
        if (err instanceof AppError_1.default) {
            return response.status(err.statusCode).json(err.throwError());
        }
        console.error(err);
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}
exports.ErrorHandler = ErrorHandler;
