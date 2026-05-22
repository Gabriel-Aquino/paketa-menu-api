"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    message;
    statusCode;
    error;
    constructor(message, statusCode, error) {
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
    }
    throwError() {
        return {
            error: this.error,
            message: this.message
        };
    }
}
exports.default = AppError;
