import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";
import { randomUUID } from "node:crypto";

export class Menu {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly relatedId: string | null
    ) { }

    public static create(name: string, relatedId: string | null = null, id?: string): Menu {
        if (!name || name.trim().length === 0) {
            throw new AppError("Menu or submenu name is required.", HttpStatus.BAD_REQUEST);
        }

        const menuId = id || randomUUID();

        return new Menu(menuId, name.trim(), relatedId);
    }
}