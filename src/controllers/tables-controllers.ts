import { NextFunction, Request, Response } from "express"
import { db } from "@/database/knex"

export class TablesController {
    async index(request: Request, response: Response, next: NextFunction){
        try {
            const tables = await db<TableRepository>("tables").select().orderBy("table_number")

            return response.json(tables)
        } catch (error) {
            next(error)
        }
    }
    

    async findById(request: Request, response: Response, next: NextFunction){
        try {
            const { table_id } = request.params
            const table = await db<TableRepository>("table")
            .select()
            .where(+table_id).first()

            return response.json(table)
        } catch (error) {
            next(error)
        }
    }

    
}