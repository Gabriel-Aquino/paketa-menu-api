import { IMenuRepository } from "../../domain/repositories/IMenuRepository";
import type { Menu } from "../../domain/entities/Menu.entities";
import { MenuModel } from "../models/mongodb/Menu.schema";
import { MenuMapper } from "../mappers/MenuMapper";

export class MongoMenuRepository implements IMenuRepository<Menu> {
    async findAll(): Promise<Menu[]> {
        const documents = await MenuModel.find();
        return MenuMapper.toDomainArray(documents);
    }

    async findById(id: string): Promise<Menu | null> {
        const document = await MenuModel.findOne({ id });
        return document ? MenuMapper.toDomain(document) : null;
    }

    async findByName(name: string): Promise<Menu | null> {
        const document = await MenuModel.findOne({ name });
        return document ? MenuMapper.toDomain(document) : null;
    }

    async hasSubmenus(id: string): Promise<boolean> {
        const hasSubmenu = await MenuModel.exists({ relatedId: id });
        return !!hasSubmenu;
    }

    async create(menu: Menu): Promise<Menu> {
        const document = await MenuModel.create(MenuMapper.toModel(menu));
        return MenuMapper.toDomain(document);
    }

    async delete(id: string): Promise<void> {
        await MenuModel.deleteOne({ id });
    }
}