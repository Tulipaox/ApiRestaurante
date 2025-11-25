import { Router } from "express"
import { productsRoutes } from "./products-routes"
import { tableRouters } from "./tables-routes"
import { tableSessionRouters } from "./table-session-routes"

const routes = Router()

routes.use("/products", productsRoutes)
routes.use("/tables", tableRouters)
routes.use("/table-session", tableSessionRouters)
export { routes }