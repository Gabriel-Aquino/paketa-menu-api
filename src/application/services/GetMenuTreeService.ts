import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import type { MenuTree } from "@domain/entities/MenuTree.entities";

export class GetMenuTreeService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(): Promise<MenuTree[]> {
        const flatMenuList = await this.menuRepository.findAll();

        return this.buildTree(flatMenuList);
    }

    private buildTree(menus: Menu[]): MenuTree[] {
        const menuNodeIndexById = new Map<string, MenuTree>();
        const rootMenus: MenuTree[] = [];

        for (const currentMenuEntity of menus) {
            menuNodeIndexById.set(currentMenuEntity.id, { ...currentMenuEntity, submenus: [] });
        }

        for (const currentMenuEntity of menus) {
            const currentTreeNode = menuNodeIndexById.get(currentMenuEntity.id)!;

            if (currentMenuEntity.relatedId) {
                const parentTreeNode = menuNodeIndexById.get(currentMenuEntity.relatedId);
                if (parentTreeNode) {
                    parentTreeNode.submenus.push(currentTreeNode);
                }
            } else {
                rootMenus.push(currentTreeNode);
            }
        }

        return rootMenus;
    }
}
