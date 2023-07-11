import { Router } from "express"
import {ProductManager} from "../../dao/productManager.js"

const productService = new ProductManager('products.json')
const router = Router()

router.get("/",async(req,res)=>{
    const products = await productService.getProducts()
    const limit =  Number(req.query.limit)

    if(limit){
        const limitProducts = products.slice(0, limit)
        res.json({
            status: "success",
            data: limitProducts,
          });
    }
    else{
        res.json({
            status: "success",
            data: products,
          });
    }
})

router.get("/:pid",async(req,res)=>{
    const pid = Number(req.params.pid)
    const product = await productService.getProductById(pid)
    product
    ? res.json({
        status: "success",
        data: product,
      })
     :  
     res.status(400).json({status:"error",
    error:"no existe producto con ese pid"})
})
router.post("/", async(req,res)=>{
    const product = req.body
    console.log(product.title)
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.status ||
    !product.category ||
    !product.thumbnails
    ? res.status(400).json({status:"error",error:"todos los campos son obligatorios"})
    :res.json({
        status: "succes",
        data: await productService.addProduct(product),
      });
})
export{router as productsRouter}