import { MongoMenuRepository } from "@database/repositories/MongoMenuRepository";
import MenuController from "@http/controllers/MenuController";
import { CreateMenuService } from "@application/services/CreateMenuService";
import { GetMenuTreeService } from "@application/services/GetMenuTreeService";
import { DeleteMenuService } from "@application/services/DeleteMenuService";

export const factoryMenuController = (): MenuController => {

    const menuRepository = new MongoMenuRepository();

    const createMenuService = new CreateMenuService(menuRepository);
    const getMenuTreeService = new GetMenuTreeService(menuRepository);
    const deleteMenuService = new DeleteMenuService(menuRepository);

    const menuController = new MenuController(createMenuService, getMenuTreeService, deleteMenuService);

    return menuController;
}