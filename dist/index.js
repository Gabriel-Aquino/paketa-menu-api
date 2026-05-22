"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const app_1 = __importDefault(require("./http/app"));
class Server {
    port;
    database;
    constructor() {
        this.port = process.env.PORT || 3000;
        this.database = new database_1.Database();
    }
    async start() {
        try {
            await this.database.connect();
            const serverInstance = app_1.default.listen(this.port, () => {
                console.log(`Servidor rodando na porta ${this.port}`);
            });
            this.setupGracefulShutdown(serverInstance);
        }
        catch (error) {
            console.error('Erro crítico ao iniciar a aplicação:', error);
            process.exit(1);
        }
    }
    setupGracefulShutdown(serverInstance) {
        const gracefulShutdown = async () => {
            console.log('Iniciando o encerramento da aplicação...');
            serverInstance.close(async () => {
                console.log('Servidor HTTP encerrado.');
                await this.database.disconnect();
                process.exit(0);
            });
        };
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    }
}
new Server().start();
