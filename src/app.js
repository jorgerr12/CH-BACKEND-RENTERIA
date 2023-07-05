const express = require("express")
const ProductManager = require("./ProductManager")

const app = express()
const manager = new ProductManager("./data/products.js")


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


  app.get("/products/:pid", (req, res) => {
    const pid = req.params.pid
    const product = manager.getProductById(pid)
    product? res.send : res.send("no se encontro producto")
  })


app.listen(8080, () => { //el callback es opcional y suele ser informativo
    console.log("Server running")
})