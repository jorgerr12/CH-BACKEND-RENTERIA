import { Router } from "express";
import { ProductManager } from "../dao/manager/productManager.js";
import { CartManager } from "../dao/manager/cartManager.js";

const router = Router();
const productService = new ProductManager()
const cartService = new CartManager()

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/", async (req, res) => {
  res.render("home", {});
});

router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, stock = 0, sort = "asc" } = req.query;
    const stockValue = stock === 0 ? undefined : parseInt(stock)
    if (!["asc", "desc"].includes(sort)) {
      return res.render("products", { error: "Dato de orden no valido" })
    };
    const sortValue = sort === "asc" ? 1 : -1;
    let query = {}
    if (stockValue) {
      query = { stock: { $gte: stockValue } }
    }

    const result = await productService.getWithPaginate(query, {
      limit,
      page,
      sort: { price: sortValue },
      lean: true
    })

    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
    const resultProducts = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products/?limit=${limit}&page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/products/?limit=${limit}&page=${result.nextPage}` : null,

    }

    res.render("products", resultProducts)
  } catch (error) {
    res.render("products", { error: error });
  }

});

router.get("/cart/:cid", async (req, res) => {
  try {
    const cid = req.params.cid

    const resultCart = await cartService.getCartById(cid)
    res.render("cart", resultCart)
    console.log(resultCart)
  } catch (error) {
    res.render("cart", {error:error})
  }


})

export { router as viewsRouter }