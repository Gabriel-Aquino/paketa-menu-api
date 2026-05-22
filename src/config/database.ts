import mongoose from "mongoose";

export class Database {
    private uri: string;

    constructor(uri?: string) {
        this.uri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/paketa_menu';
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
            console.log('Conexão com o MongoDB estabelecida com sucesso.');
        } catch (error) {
            throw new Error(`Falha ao conectar no MongoDB: ${(error as Error).message}`);
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.connection.close();
        console.log('Conexão com o banco de dados encerrada.');
    }
}