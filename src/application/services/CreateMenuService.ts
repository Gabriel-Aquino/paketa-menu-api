import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";

type CreateMenuRequest = {
    name: string;
    relatedId?: string | null;
}

export class CreateMenuService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(menuData: CreateMenuRequest): Promise<Menu> {
        const { name, relatedId } = menuData;

        const menuEntityToCreate = Menu.create(name, relatedId || null);

        if (menuEntityToCreate.relatedId) {
            const parentMenuEntity = await this.menuRepository.findById(menuEntityToCreate.relatedId);

            if (!parentMenuEntity) {
                throw new AppError("O menu pai especificado não foi encontrado.", HttpStatus.NOT_FOUND);
            }
        }

        const createdMenu = await this.menuRepository.create(menuEntityToCreate);

        return createdMenu;
    }
}
