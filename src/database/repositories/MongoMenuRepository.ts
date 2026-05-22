import { IMenuRepository } from "../../domain/repositories/IMenuRepository";
import type { Menu } from "../../domain/entities/Menu.entities";

export class MongoMenuRepository implements IMenuRepository<Menu> {
    async findAll(): Promise<Menu[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Menu | null> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Menu | null> {
        throw new Error("Method not implemented.");
    }

    async hasSubmenus(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(menu: Menu): Promise<Menu> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}