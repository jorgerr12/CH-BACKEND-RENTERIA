import { Router } from "express";
const router = Router();

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});
router.get("/", async (req, res) => {
  res.render("home",{});
});
router.get("/products", (req, res) => {
  res.render("products", {});
});

export { router as viewsRouter }