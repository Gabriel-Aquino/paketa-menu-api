export interface IDeleteMenuService {
    execute(id: string): Promise<void>;
}