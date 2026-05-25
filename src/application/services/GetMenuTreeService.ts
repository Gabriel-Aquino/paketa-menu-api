import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import type { MenuTree } from "@domain/entities/MenuTree.entities";
import { IGetMenuTreeService } from "../contracts/IGetMenuTreeService";
import { GetMenuResponse } from "../dtos/GetMenuResponse";

export class GetMenuTreeService implements IGetMenuTreeService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(): Promise<GetMenuResponse> {
        const flatMenuList = await this.menuRepository.findAll();

        const menuTreeResponse = this.buildTree(flatMenuList);

        return menuTreeResponse;
    }

    private buildTree(menusFromDatabase: Menu[]): MenuTree[] {
        const menuNodeIndexedById = new Map<string, MenuTree>();
        const rootMenusToReturn: MenuTree[] = [];

        for (const currentMenuEntity of menusFromDatabase) {
            menuNodeIndexedById.set(currentMenuEntity.id, { ...currentMenuEntity, submenus: [] });
        }

        for (const currentMenuEntity of menusFromDatabase) {
            const currentTreeNode = menuNodeIndexedById.get(currentMenuEntity.id)!;

            if (currentMenuEntity.relatedId) {
                const parentTreeNode = menuNodeIndexedById.get(currentMenuEntity.relatedId);
                if (parentTreeNode) {
                    parentTreeNode.submenus!.push(currentTreeNode);
                }
            } else {
                rootMenusToReturn.push(currentTreeNode);
            }
        }
        for (const node of menuNodeIndexedById.values()) {
            if (node.submenus && node.submenus.length === 0) {
                delete node.submenus;
            }
            delete (node as any).relatedId;
        }


        return rootMenusToReturn;
    }
}
