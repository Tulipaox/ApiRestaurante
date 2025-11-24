import {NextFunction, Request, Response} from "express"

import { AppError } from "../utils/App.Error";

import {ZodError} from "zod"

export function errorHandling (error: any, request: Request, response: Response, _: NextFunction){
    if(error instanceof AppError) {
        return response.status(error.statuCode).json({message: error.message})
    }

    if(error instanceof ZodError) {
        return response.status(400).json({message: "validation error", issues: error.format()})
    }

    return response.status(500).json({message: error.message})
}