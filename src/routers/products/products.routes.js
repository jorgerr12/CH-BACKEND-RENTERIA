import { Router } from "express"
import { ProductosController } from "../../controllers/products.controller.js"

const router = Router()

router.get("/",ProductosController.index)
router.get("/:pid",ProductosController.getById)
router.post("/",ProductosController.store)
router.put("/:pid",ProductosController.update)
router.delete("/:pid", ProductosController.delete);

export { router as productsRouter }