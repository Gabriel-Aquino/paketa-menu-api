import { IMenuRepository } from "../../domain/repositories/IMenuRepository";
import type { Menu } from "../../domain/entities/Menu.entities";
export declare class MongoMenuRepository implements IMenuRepository<Menu> {
    findAll(): Promise<Menu[]>;
    findById(id: string): Promise<Menu | null>;
    findByName(name: string): Promise<Menu | null>;
    hasSubmenus(id: string): Promise<boolean>;
    create(menu: Menu): Promise<Menu>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=MongoMenuRepository.d.ts.map