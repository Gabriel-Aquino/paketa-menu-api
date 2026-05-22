import type { Menu } from "./Menu.entities";
export interface MenuTree extends Menu {
    submenus: MenuTree[];
}
//# sourceMappingURL=MenuTree.entities.d.ts.map