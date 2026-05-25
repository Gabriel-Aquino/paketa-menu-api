import mongoose from "mongoose";

export class Database {
    private uri: string;

    constructor(uri?: string) {
        if (!uri && !process.env.MONGO_URI) {
            throw new Error('MONGO_URI not configured.');
        }
        this.uri = uri || process.env.MONGO_URI!;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.uri);
            console.log('MongoDB connection success.');
        } catch (error) {
            throw new Error(`Failed to connect to MongoDB: ${(error as Error).message}`);
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}