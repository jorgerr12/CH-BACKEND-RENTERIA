import { Router } from "express";
import { CartManager } from "../../dao/manager/cartManager.js";

const cartService = new CartManager('cart.json')
const router = Router()

router.get('/:cid',async(req,res)=>{
    const cid = Number(req.params.cid)
    const data = await cartService.getCartById(cid)
    data
    ? res.json({status:"success",data:data})
    : res.json({status:"error",error:"cid incorrecto"})

})

router.post("/",async (req,res)=>{
    res.json({
        status:"success",
        data: await cartService.createCart()
    })
})

router.post("/:cid/product/:pid",async (req,res)=>{
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
    console.log(cid,pid)
    const data = await cartService.addToCart(cid,pid)
    data
    ?res.json({
        status:"success",
        data:data
    })
    :res.json({status:"error",error:"error al registrar producto"})
})

export{router as cartsRouter}