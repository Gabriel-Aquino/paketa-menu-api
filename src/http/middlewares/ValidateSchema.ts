import AppError from "@shared/errors/AppError";
import { HttpStatus } from "@shared/utils/HttpStatus";
import { NextFunction, Request, Response } from "express";
import { ZodType, ZodError } from "zod";



export class ValidateSchemaMiddleware {

    constructor(private readonly schema: ZodType, private readonly enumType: 'body' | 'query' | 'params') { }

    public validate = (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = this.schema.parse(request[this.enumType]);
            request[this.enumType] = data;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.issues[0].message, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
}