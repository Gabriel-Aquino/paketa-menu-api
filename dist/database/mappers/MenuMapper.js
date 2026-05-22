"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuMapper = void 0;
class MenuMapper {
    static toDomain(menu) {
        return {
            id: menu._id.toString(),
            name: menu.name,
            relatedId: menu.relatedId?.toString() || null
        };
    }
}
exports.MenuMapper = MenuMapper;
