import  express  from "express"
import { __dirname } from "./utils.js"
import hanblebars  from "express-handlebars"
import { config } from "./config/config.js"
import {viewsRouter} from "./routers/views.routes.js"
import { connectDB } from "./config/dbConnection.js"
import { productsRouter } from "./routers/products/products.routes.js"
import { cartsRouter } from "./routers/cart/cart.routes.js"
const app = express();

app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));



const httpServer = app.listen(config.server.port, () => {
    console.log("server running in port", config.server.port);
  });

  connectDB();
app.use(viewsRouter);
