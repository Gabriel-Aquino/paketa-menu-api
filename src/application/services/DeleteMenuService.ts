import type { IMenuRepository } from "@domain/repositories/IMenuRepository";
import { Menu } from "@domain/entities/Menu.entities";
import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";

export class DeleteMenuService {
    constructor(private readonly menuRepository: IMenuRepository<Menu>) { }

    async execute(targetMenuId: string): Promise<void> {
        const menuToDelete = await this.menuRepository.findById(targetMenuId);

        if (!menuToDelete) {
            throw new AppError("O menu não foi encontrado.", HttpStatus.NOT_FOUND);
        }

        const hasLinkedSubmenus = await this.menuRepository.hasSubmenus(targetMenuId);
        if (hasLinkedSubmenus) {
            throw new AppError(
                "Você não pode deletar este menu porque ele possui submenus vinculados.",
                HttpStatus.CONFLICT
            );
        }

        await this.menuRepository.delete(targetMenuId);
    }
}
