import { TableSessionController } from "@/controllers/table-session-controller"
import { Router } from "express"

export const tableSessionRouters = Router()
const tablesSessionController = new TableSessionController()


tableSessionRouters.post("/", tablesSessionController.create)