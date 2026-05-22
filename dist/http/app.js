"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
class App {
    server;
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }
    middlewares() {
        this.server.use((0, cors_1.default)());
        this.server.use((0, helmet_1.default)());
        this.server.use(express_1.default.json());
        this.server.use((0, morgan_1.default)('dev'));
    }
    routes() {
        // TODO: Registrar rotas aqui (ex: this.server.use(route))
        this.server.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK' });
        });
    }
    exceptionHandler() {
        this.server.use(ErrorHandler_1.ErrorHandler.handle);
    }
}
exports.App = App;
exports.default = new App().server;
