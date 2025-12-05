import { OrderController } from "@/controllers/order-controller"
import { Router } from "express"

export const orderRoutes = Router()
const orderController = new OrderController()

orderRoutes.post("/:productID/:tableSessionId", orderController.create)
orderRoutes.get("/table-session/:tableSessionId", orderController.index)