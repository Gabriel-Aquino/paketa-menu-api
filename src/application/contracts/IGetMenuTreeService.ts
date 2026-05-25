import { GetMenuResponse } from "@application/dtos/GetMenuResponse";

export interface IGetMenuTreeService {
    execute(): Promise<GetMenuResponse>;
}