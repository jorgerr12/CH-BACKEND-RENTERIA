const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()
const manager = new ProductManager("./data/products.js")
const PORT = 8080


app.get("/products", async (req, res) => {
    const products = await manager.getProducts()
    const limit = Number(req.query.limit)
  
    if(limit){
      const limitProducts = products.slice(0, limit)
      res.send(limitProducts)
    } else {
      res.send(products)
    }
  })


  app.get("/products/:pid",async (req, res) => {
    const pid = req.params.pid
    console.log(pid)
    const product =  await manager.getProductById(pid)
    product? res.send(product):res.send("no se encontro producto")
  })


app.listen(PORT, () => { 
    console.log(`Servidor Express corriendo en el puerto: ${PORT}`)
})