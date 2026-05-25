import { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";

export class InMemoryMenuRepository implements IMenuRepository<Menu> {
    private menus: Menu[] = [];

    async findAll(): Promise<Menu[]> {
        return this.menus;
    }

    async findById(id: string): Promise<Menu | null> {
        return this.menus.find(menu => menu.id === id) || null;
    }

    async findByName(name: string): Promise<Menu | null> {
        return this.menus.find(menu => menu.name === name) || null;
    }

    async hasSubmenus(id: string): Promise<boolean> {
        return this.menus.some(menu => menu.relatedId === id);
    }

    async create(menu: Menu): Promise<Menu> {
        this.menus.push(menu);
        return menu;
    }

    async delete(id: string): Promise<void> {
        this.menus = this.menus.filter(menu => menu.id !== id);
    }
}
