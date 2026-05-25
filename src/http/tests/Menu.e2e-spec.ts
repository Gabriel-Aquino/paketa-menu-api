import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '@http/app';
import { Database } from '@config/database';
import { MenuModel } from '@database/models/mongodb/Menu.schema';
import { randomUUID } from 'node:crypto';

let mongoServer: MongoMemoryServer;
let db: Database;
const API_URL = '/api/v1/menu';

beforeAll(async () => {
    process.env.API_VERSION = 'v1';
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    db = new Database(uri);
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

describe('Menu E2E', () => {
    describe('POST /api/v1/menu', () => {
        it('should create a new root menu and return 201', async () => {
            const res = await request(app)
                .post(API_URL)
                .send({ name: 'Eletrônicos' });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');

            const menuInDb = await MenuModel.findOne({ name: 'Eletrônicos' });
            expect(menuInDb).toBeTruthy();
        });

        it('should fail to create a menu without a name', async () => {
            const res = await request(app)
                .post(API_URL)
                .send({});

            expect(res.status).toBeGreaterThanOrEqual(400); 
        });
    });

    describe('DELETE /api/v1/menu/:id', () => {
        it('should delete a menu that has no submenus', async () => {
            const menu = await MenuModel.create({ _id: randomUUID(), name: 'Eletrônicos' });

            const res = await request(app).delete(`${API_URL}/${menu._id}`);

            expect(res.status).toBe(200);

            const menuInDb = await MenuModel.findById(menu._id);
            expect(menuInDb).toBeNull();
        });

        it('should fail with 409 when trying to delete a menu with submenus', async () => {
            const parent = await MenuModel.create({ _id: randomUUID(), name: 'Eletrônicos' });
            await MenuModel.create({ _id: randomUUID(), name: 'Televisores', relatedId: parent._id });

            const res = await request(app).delete(`${API_URL}/${parent._id}`);

            expect(res.status).toBe(409);
        });
    });

    describe('GET /api/v1/menu', () => {
        it('should return the full menu tree', async () => {
            const parent = await MenuModel.create({ _id: '1', name: 'Eletrônicos' });
            const child1 = await MenuModel.create({ _id: '2', name: 'Televisores', relatedId: parent._id });
            const child2 = await MenuModel.create({ _id: '3', name: 'Smartphones', relatedId: parent._id });
            await MenuModel.create({ _id: '4', name: 'OLED', relatedId: child1._id });

            const res = await request(app).get(API_URL);

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].name).toBe('Eletrônicos');
            expect(res.body[0].submenus).toHaveLength(2);

            const televisores = res.body[0].submenus.find((m: any) => m.name === 'Televisores');
            expect(televisores.submenus).toHaveLength(1);
            expect(televisores.submenus[0].name).toBe('OLED');
        });
    });
});
