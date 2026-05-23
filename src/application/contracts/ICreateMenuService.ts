import { CreateMenuRequest } from "../dtos/CreateMenuRequest";
import CreateMenuResponse from "../dtos/CreateMenuResponse";

export interface ICreateMenuService {
    execute(menuData: CreateMenuRequest): Promise<CreateMenuResponse>;
}