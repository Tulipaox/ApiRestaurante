import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { db as knex } from "@/database/knex"
import { AppError } from "@/utils/App.Error"

const bodySchema = z.object({
    quantity: z.number().gt(0, { message: "value must be greateer than 0" }),
    price: z.number().gt(0, { message: "value must be greateer than 0" })
})



export class OrderController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { quantity } = bodySchema.parse(request.body)

            const productID = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.productID)

            const tableSessionId = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.tableSessionId)

            const product = await knex<ProductRepository>("products").select()
                .where({ id: productID }).first().orderBy("name", "asc")

            const tableSession = await knex<TableSessionRepository>("table_sessions").select()
                .where({ id: tableSessionId }).first().orderBy("closed_at", "asc")

            if (!product) {
                throw new AppError("Product not found!")
            }

            if (tableSession?.closed_at) {
                throw new AppError("this table table is closed")
            }

            if (!tableSession) {
                throw new AppError("Session table not found!")
            }

            const [order] = await knex<OrderRepository>("orders")
                .insert({
                    quantity,
                    price: product.price,
                    product_id: productID,
                    table_session_id: tableSessionId
                })
                .returning("*")

            return response.status(201).json({
                message: "Order created successfully",
                order: {
                    id: order.id,
                    product: product.name,
                    unitPrice: product.price,
                    quantity,
                    total: product.price * quantity
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { tableSessionId } = request.params

            const order = await knex("order")
            .select("order.id", 
                "orders.table_session_id", 
                "orders.product_id",
                "products.name", 
                "orders.price", 
                "orders.quantity",
                knex.raw("(orders.price * orders.quantity) AS total"),
                "orders.created_at",
                "orders.updated_at"
            )
            .join("products", "products.id", "orders.product_id")
            .where({ tableSessionId })
            .orderBy("orders.created_at")

            return response.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }
}