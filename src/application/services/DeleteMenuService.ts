import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";
import { IDeleteMenuService } from "@application/contracts/IDeleteMenuService";

export class DeleteMenuService implements IDeleteMenuService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(targetMenuId: string): Promise<void> {
        const menuToDelete = await this.menuRepository.findById(targetMenuId);

        if (!menuToDelete) {
            throw new AppError("Menu not found.", HttpStatus.NOT_FOUND);
        }

        const hasLinkedSubmenus = await this.menuRepository.hasSubmenus(targetMenuId);
        if (hasLinkedSubmenus) {
            throw new AppError(
                "You can't delete this menu because it has linked submenus.",
                HttpStatus.CONFLICT
            );
        }

        await this.menuRepository.delete(targetMenuId);
    }
}
