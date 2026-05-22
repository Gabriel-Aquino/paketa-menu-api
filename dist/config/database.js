"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    uri;
    constructor(uri) {
        this.uri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/paketa_menu';
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.uri);
            console.log('Conexão com o MongoDB estabelecida com sucesso.');
        }
        catch (error) {
            throw new Error(`Falha ao conectar no MongoDB: ${error.message}`);
        }
    }
    async disconnect() {
        await mongoose_1.default.connection.close();
        console.log('Conexão com o banco de dados encerrada.');
    }
}
exports.Database = Database;
