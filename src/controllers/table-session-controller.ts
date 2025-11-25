import { NextFunction, Request, Response } from "express"
import { db as knex } from "@/database/knex"
import { z } from "zod"

const bodySchema = z.object({
    table_id: z.number()
})

export class TableSessionController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_id } = bodySchema.parse(request.body)
            await knex<TableSessionRepository>("table_sessions").insert({
                table_id,
                opened_at: knex.fn.now()
            })
            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_id } = bodySchema.parse(request.body)
            await knex<TableSessionRepository>("table_sessions")
            .update({
                closed_at: knex.fn.now()
            }).where({table_id})
            
            return response.status(200).json()
        } catch (error) {
            next(error)
        }
    }
}