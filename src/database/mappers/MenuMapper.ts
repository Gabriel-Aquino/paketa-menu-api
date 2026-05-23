import { Types, Document } from "mongoose";
import type { Menu } from "../../domain/entities/Menu.entities";
import type { IMenu } from "../models/mongodb/Menu.schema";

export class MenuMapper {
    static toDomain(menu: IMenu): Menu {
        return {
            id: menu._id,
            name: menu.name,
            relatedId: menu.relatedId || null
        }
    }

    static toDomainArray(menus: IMenu[]): Menu[] {
        return menus.map((menu) => this.toDomain(menu));
    }

    static toModel(menu: Menu): Partial<IMenu> {
        return {
            _id: menu.id,
            name: menu.name,
            relatedId: menu.relatedId ?? null
        }
    }
}