import { Router } from "express";
import { menuRoutes } from "./MenuRoutes";

const apiVersion = process.env.API_VERSION;

export default class Routes {

    private routes: Router = Router();

    private urlPattern: string;

    constructor() {
        this.urlPattern = `/api/${apiVersion}`;
    }

    execute() {
        this.routes.use(this.urlPattern, menuRoutes);

        return this.routes;
    }
}