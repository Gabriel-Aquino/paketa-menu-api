import { ValidateSchemaMiddleware } from "@http/middlewares/ValidateSchema";
import { createMenuSchema } from "@http/validators/CreateMenuSchema";
import { deleteMenuSchema } from "@http/validators/DeleteMenuSchema";
import { factoryMenuController } from "@shared/factories/FactoryMenuController";
import { Router } from "express";

const menuController = factoryMenuController();

const menuRoutes = Router();


menuRoutes.post("/menu", new ValidateSchemaMiddleware(createMenuSchema, 'body').validate, menuController.create.bind(menuController));
menuRoutes.get("/menu", menuController.getMenuTree.bind(menuController));
menuRoutes.delete("/menu/:id", new ValidateSchemaMiddleware(deleteMenuSchema, 'params').validate, menuController.delete.bind(menuController));

export { menuRoutes }