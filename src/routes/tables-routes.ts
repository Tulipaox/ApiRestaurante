import { TablesController } from "@/controllers/tables-controllers"
import { Router } from "express"

export const tableRouters = Router()
const tablesController = new  TablesController()


tableRouters.get("/", tablesController.index)
tableRouters.get("/:id", tablesController.findById)