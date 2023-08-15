import { Router } from "express";
import { ProductManager } from "../dao/manager/productManager.js";

const router = Router();
const productService = new ProductManager()
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});
router.get("/", async (req, res) => {
  res.render("home",{});
});
router.get("/products",async (req, res) => {
  try {
    const{limit=10,page=1,stock=0,sort="asc"}= req.query;
    const stockValue = stock===0 ? undefined : parseInt(stock)
    if(!["asc","desc"].includes(sort)){
      return res.render("products",{error:"Dato de orden no valido"})
    };
    const sortValue = sort=== "asc"? 1 :-1;
    let query ={}
    if(sortValue){
      query={stock:{$gte:stockValue}}
    }

    const result = await productService.getWithPaginate(query,{
      limit,
      page,
      sort:{price:sortValue},
    })
    res.render("products",result)
  } catch (error) {
    res.render("products", {error:error});
  }
  
});

export { router as viewsRouter }