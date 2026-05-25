import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";
import { CreateMenuRequest } from "@application/dtos/CreateMenuRequest";
import { ICreateMenuService } from "@application/contracts/ICreateMenuService";
import CreateMenuResponse from "@application/dtos/CreateMenuResponse";

export class CreateMenuService implements ICreateMenuService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(menuData: CreateMenuRequest): Promise<CreateMenuResponse> {
        const { name, relatedId } = menuData;

        const findMenuByName = await this.menuRepository.findByName(name);

        if (findMenuByName) {
            throw new AppError("menu or submenu with this name already exists.", HttpStatus.BAD_REQUEST);
        }

        const menuEntityToCreate = Menu.create(name, relatedId || null);

        if (menuEntityToCreate.relatedId) {
            const parentMenuEntity = await this.menuRepository.findById(menuEntityToCreate.relatedId);

            if (!parentMenuEntity) {
                throw new AppError("Parent menu not found.", HttpStatus.NOT_FOUND);
            }
        }

        const createdMenu = await this.menuRepository.create(menuEntityToCreate);

        return CreateMenuResponse.build(createdMenu.id);
    }
}
