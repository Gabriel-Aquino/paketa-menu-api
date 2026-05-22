export interface IMenuRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    findByName(name: string): Promise<T | null>;
    hasSubmenus(id: string): Promise<boolean>;
    create(menu: T): Promise<T>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IMenuRepository.d.ts.map