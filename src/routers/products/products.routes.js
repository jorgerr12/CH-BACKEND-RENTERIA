import { Router } from "express"
import { ProductManager } from "../../dao/productManager.js"

const productService = new ProductManager('products.json')
const router = Router()

router.get("/", async (req, res) => {
    const products = await productService.getProducts()
    const limit = Number(req.query.limit)

    if (limit) {
        const limitProducts = products.slice(0, limit)
        res.json({
            status: "success",
            data: limitProducts,
        });
    }
    else {
        res.json({
            status: "success",
            data: products,
        });
    }
})

router.get("/:pid", async (req, res) => {
    const pid = Number(req.params.pid)
    const product = await productService.getProductById(pid)
    product
        ? res.json({
            status: "success",
            data: product,
        })
        :
        res.status(400).json({
            status: "error",
            error: "no existe producto con ese pid"
        })
})
router.post("/", async (req, res) => {
    const product = req.body
    console.log(product.title)
    !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.status ||
        !product.category 
        ? res.status(400).json({ status: "error", error: "todos los campos son obligatorios" })
        : res.json({
            status: "succes",
            data: await productService.addProduct(product),
        });
})

router.put("/:pid", async (req, res) => {
    const pid = Number(req.params.pid)
    const pruduct = req.body;
    const foundId = pruduct.hasOwnProperty("id");
    const data = await productService.updateProduct(pid, pruduct)
    console.log(data)

    if (foundId) {
        res.status(400).send("no se puede modificar la propiedad id");
    } else {
        if (data) {
            res.json({
                status: "succes",
                data: data
            });
        } else {
            res.status(400).json({status:"error",error:"producto no existe"})
        }
    }
})

router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);
    const existe = productService.getProductById(pid)

    existe
    ? res.json({
        status: "succes",
        data: await productService.deleteProduct(pid),
      })
    : res.status(400).json({status:"error",error:"producto no existe"});
    
  });


export { router as productsRouter }