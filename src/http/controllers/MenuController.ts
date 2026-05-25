import { ICreateMenuService } from "@application/contracts/ICreateMenuService";
import { Request, Response } from "express";
import { CreateMenuRequest } from "@application/dtos/CreateMenuRequest";
import { HttpStatus } from "@shared/utils/HttpStatus";
import { IGetMenuTreeService } from "@application/contracts/IGetMenuTreeService";
import { IDeleteMenuService } from "@application/contracts/IDeleteMenuService";

export default class MenuController {

    constructor(
        private readonly createMenuService: ICreateMenuService,
        private readonly getMenuTreeService: IGetMenuTreeService,
        private readonly deleteMenuService: IDeleteMenuService
    ) { }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, relatedId } = request.body

        const menuCreateRequest = CreateMenuRequest.build(name, relatedId);

        const menuCreatedResponse = await this.createMenuService.execute(menuCreateRequest);

        return response.status(HttpStatus.CREATED).json(menuCreatedResponse);
    }

    public async getMenuTree(_: Request, response: Response): Promise<Response> {

        const menuTreeResponse = await this.getMenuTreeService.execute();

        return response.status(HttpStatus.OK).json(menuTreeResponse);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        await this.deleteMenuService.execute(String(id));

        return response.status(HttpStatus.OK).json({ message: "Menu deleted successfully." });
    }
}