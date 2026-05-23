import { GetMenuResponse } from "../dtos/GetMenuResponse";

export interface IGetMenuTreeService {
    execute(): Promise<GetMenuResponse>;
}