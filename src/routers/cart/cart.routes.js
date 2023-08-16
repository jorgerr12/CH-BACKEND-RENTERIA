import { Router } from "express";
import { CartManager } from "../../dao/manager/cartManager.js";

const cartService = new CartManager('cart.json')
const router = Router()

router.get('/:cid',async(req,res)=>{
    const cid = req.params.cid
    const data = await cartService.getCartById(cid)
    data
    ? res.json({status:"success",data:data})
    : res.json({status:"error",error:"cid incorrecto"})

})

router.post("/",async (req,res)=>{
    const {products} = req.body
    const data={
        products:[...products],
        
    }
    res.json({
        status:"success",
        data: await cartService.createCart(data)
    })
})

router.put("/:cid",async (req,res)=>{
    const cid = req.params.cid
    const {products} = req.body
    const data = await cartService.updateCart(cid,products)
    data
    ?res.json({
        status:"success",
        data:data
    })
    :res.json({status:"error",error:"error al registrar producto"})
})

router.put("/:cid/product/:pid",async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity}= req.body
    const result = await cartService.updateProductFromCart(cid,pid,quantity)
    result
    ? 
        res.json({
        status:"success",
        result:result
    })
    :res.json({status:"error",error:"error al registrar producto"})
})
router.delete("/:cid/product/:pid",async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cartService.deleteProduct(cid,pid)
    result
    ? 
        res.json({
        status:"success",
        result:result
    })
    :res.json({status:"error",error:"error al registrar producto"})
})
router.delete("/:cid",async(req,res)=>{
    const cid = req.params.cid
    const result = await cartService.deleteAllProductsCart(cid)
    result
    ? 
        res.json({
        status:"success",
        result:result
    })
    :res.json({status:"error",error:"error al registrar producto"})
})

export{router as cartsRouter}