import { CartService as cartService } from "../repository/index.repository.js"


export class CartController {

    static async index (req,res){
        const cid = req.params.cid
        const data = await cartService.getCartById(cid)
        data
        ? res.json({status:"success",data:data})
        : res.json({status:"error",error:"cid incorrecto"})
    }

    static async create (req,res){
        const {products} = req.body
    const data={
        products:[...products],
        
    }
    res.json({
        status:"success",
        data: await cartService.createCart(data)
    })
    }

    static async update (req,res){
        const cid = req.params.cid
        const {products} = req.body
        const data = await cartService.updateCart(cid,products)
        data
        ?res.json({
            status:"success",
            data:data
        })
        :res.json({status:"error",error:"error al registrar producto"})
    }

    static async updateProduct (req,res){
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
    }
    static async deleteProduct (req,res){
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
    }

    static async deleteAllProduct (req,res){
        const cid = req.params.cid
        const result = await cartService.deleteAllProductsCart(cid)
        result
        ? 
            res.json({
            status:"success",
            result:result
        })
        :res.json({status:"error",error:"error al registrar producto"})
    }
}