import { DeleteMenuService } from "./DeleteMenuService";
import { InMemoryMenuRepository } from "@database/repositories/InMemoryMenuRepository";
import AppError from "@shared/errors/AppError";
import { Menu } from "@domain/entities/Menu.entities";
import { randomUUID } from "node:crypto";

describe("DeleteMenuService", () => {
    let menuRepository: InMemoryMenuRepository;
    let deleteMenuService: DeleteMenuService;

    beforeEach(() => {
        menuRepository = new InMemoryMenuRepository();
        deleteMenuService = new DeleteMenuService(menuRepository);
    });

    it("should delete a menu successfully", async () => {
        const menu = Menu.create("Eletrônicos");
        await menuRepository.create(menu);

        await deleteMenuService.execute(menu.id);

        const deletedMenu = await menuRepository.findById(menu.id);
        expect(deletedMenu).toBeNull();
    });

    it("should throw an AppError (404) when trying to delete a non-existent menu", async () => {
        const fakeId = randomUUID();
        
        await expect(deleteMenuService.execute(fakeId))
            .rejects.toBeInstanceOf(AppError);
    });

    it("should throw an AppError (409) when trying to delete a menu with linked submenus", async () => {
        const parentMenu = Menu.create("Eletrônicos");
        await menuRepository.create(parentMenu);

        const childMenu = Menu.create("Televisores", parentMenu.id);
        await menuRepository.create(childMenu);

        await expect(deleteMenuService.execute(parentMenu.id))
            .rejects.toBeInstanceOf(AppError);
    });
});
