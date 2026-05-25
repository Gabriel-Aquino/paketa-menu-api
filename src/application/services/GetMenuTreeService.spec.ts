import { GetMenuTreeService } from "./GetMenuTreeService";
import { InMemoryMenuRepository } from "@database/repositories/InMemoryMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";

describe("GetMenuTreeService", () => {
    let menuRepository: InMemoryMenuRepository;
    let getMenuTreeService: GetMenuTreeService;

    beforeEach(() => {
        menuRepository = new InMemoryMenuRepository();
        getMenuTreeService = new GetMenuTreeService(menuRepository);
    });

    it("should return an empty array if there are no records", async () => {
        const result = await getMenuTreeService.execute();
        expect(result).toEqual([]);
    });

    it("should build the tree O(N) correctly nested", async () => {
        const menu1 = Menu.create("Eletrônicos", null, "1");
        const menu2 = Menu.create("Televisores", "1", "2");
        const menu3 = Menu.create("Smartphones", "1", "3");
        const menu4 = Menu.create("OLED", "2", "4");

        await menuRepository.create(menu1);
        await menuRepository.create(menu2);
        await menuRepository.create(menu3);
        await menuRepository.create(menu4);

        const result = await getMenuTreeService.execute();

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("1");
        // We type cast or index since the actual response shape might vary, but logically it matches.
        expect(result[0].submenus).toHaveLength(2);
        
        const televisores = result[0].submenus!.find(m => m.id === "2");
        expect(televisores).toBeDefined();
        expect(televisores!.submenus).toHaveLength(1);
        expect(televisores!.submenus![0].id).toBe("4");
    });

    it("should guarantee that nodes without children DO NOT have the submenus: [] property", async () => {
        const menu1 = Menu.create("Eletrônicos", null, "1");
        await menuRepository.create(menu1);

        const result = await getMenuTreeService.execute();

        expect(result[0].submenus).toBeUndefined();
    });
});
