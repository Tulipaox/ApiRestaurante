import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { db } from "@/database/knex"
import { AppError } from "@/utils/App.Error"

const bodySchema = z.object({
    name: z.string({ required_error: "name is required!" }).trim().min(6),
    price: z.number().gt(0, { message: "value must be greateer than 0" })
})

export class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.params
            const products = await db<ProductRepository>("products")
                .select()
                .whereLike("name", `${name ?? ""}`)
                .orderBy("name")

            return response.json(products)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, price } = bodySchema.parse(request.body)

            await db<ProductRepository>("products").insert({ name, price })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, price } = bodySchema.parse(request.body)
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const product = await db<ProductRepository>("products").select().where({ id }).first()

            if (!product) {
                throw new AppError("products not found!")
            }

            await db<ProductRepository>("products")
                .update({ name, price, updated_at: db.fn.now() })
                .where({ id })

            return response.status(200).json()
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const product = await db<ProductRepository>("products").select().where({ id }).first()

            if (!product) {
                throw new AppError("products not found!")
            }

            await db<ProductRepository>("products").delete().where({ id })

            return response.status(200).json()
        } catch (error) {
            next(error)
        }
    }
}