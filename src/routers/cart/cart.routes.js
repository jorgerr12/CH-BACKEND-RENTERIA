import { Router } from "express";
import { CartController } from "../../controllers/cart.controller.js";


const router = Router()

router.get('/:cid',CartController.index)
router.post("/",CartController.create)
router.put("/:cid",CartController.update)
router.put("/:cid/product/:pid",CartController.updateProduct)
router.delete("/:cid/product/:pid",CartController.deleteProduct)
router.delete("/:cid",CartController.deleteAllProduct)

export{router as cartsRouter}