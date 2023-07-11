import  express  from "express"
import { productsRouter } from "./routers/products/products.routes.js"
import { cartsRouter } from "./routers/cart/cart.routes.js"


const app = express()
<<<<<<< HEAD
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
=======
const manager = new ProductManager("./data/products.js")
const PORT = 8080
>>>>>>> a970e4ce6659455abdcf972c6a4745b29ac9975d


app.listen(port, () => { //el callback es opcional y suele ser informativo
    console.log("Server running on port",port)
})


<<<<<<< HEAD
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
=======
  app.get("/products/:pid",async (req, res) => {
    const pid = req.params.pid
    console.log(pid)
    const product =  await manager.getProductById(pid)
    product? res.send(product):res.send("no se encontro producto")
  })


app.listen(PORT, () => { 
    console.log(`Servidor Express corriendo en el puerto: ${PORT}`)
})
>>>>>>> a970e4ce6659455abdcf972c6a4745b29ac9975d
