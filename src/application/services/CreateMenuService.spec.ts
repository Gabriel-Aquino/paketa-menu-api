import { CreateMenuService } from "./CreateMenuService";
import { InMemoryMenuRepository } from "@database/repositories/InMemoryMenuRepository";
import AppError from "@shared/errors/AppError";
import { Menu } from "@domain/entities/Menu.entities";
import { randomUUID } from "node:crypto";

describe("CreateMenuService", () => {
    let menuRepository: InMemoryMenuRepository;
    let createMenuService: CreateMenuService;

    beforeEach(() => {
        menuRepository = new InMemoryMenuRepository();
        createMenuService = new CreateMenuService(menuRepository);
    });

    it("should create a root menu successfully", async () => {
        const response = await createMenuService.execute({ name: "Eletrônicos", relatedId: null });
        expect(response.id).toBeDefined();

        const savedMenu = await menuRepository.findById(response.id);
        expect(savedMenu).toBeDefined();
        expect(savedMenu?.name).toBe("Eletrônicos");
        expect(savedMenu?.relatedId).toBeNull();
    });

    it("should create a submenu linked to an existing parent", async () => {
        const parent = Menu.create("Eletrônicos");
        await menuRepository.create(parent);

        const response = await createMenuService.execute({ name: "Televisores", relatedId: parent.id });
        
        const savedMenu = await menuRepository.findById(response.id);
        expect(savedMenu?.relatedId).toBe(parent.id);
    });

    it("should throw an AppError when trying to create a menu with an existing name", async () => {
        const existingMenu = Menu.create("Eletrônicos");
        await menuRepository.create(existingMenu);

        await expect(createMenuService.execute({ name: "Eletrônicos", relatedId: null }))
            .rejects.toBeInstanceOf(AppError);
    });

    it("should throw an AppError when passing a relatedId that does not exist in the repository", async () => {
        const fakeId = randomUUID();
        await expect(createMenuService.execute({ name: "Televisores", relatedId: fakeId }))
            .rejects.toBeInstanceOf(AppError);
    });

    it("should throw an AppError from the Domain Entity when trying to create a menu with an empty name", async () => {
        await expect(createMenuService.execute({ name: "   ", relatedId: null }))
            .rejects.toBeInstanceOf(AppError);
    });
});
