import { CreateMenuRequest } from "@application/dtos/CreateMenuRequest";
import CreateMenuResponse from "@application/dtos/CreateMenuResponse";

export interface ICreateMenuService {
    execute(menuData: CreateMenuRequest): Promise<CreateMenuResponse>;
}