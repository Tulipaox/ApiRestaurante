import { TableSessionController } from "@/controllers/table-session-controller"
import { table } from "console"
import { Router } from "express"

export const tableSessionRouters = Router()
const tablesSessionController = new TableSessionController()


tableSessionRouters.post("/", tablesSessionController.create)
tableSessionRouters.get("/", tablesSessionController.index)
tableSessionRouters.patch("/:id", tablesSessionController.update)