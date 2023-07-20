import  express  from "express"
import fs from "fs/promises"
import { __dirname } from "./utils.js"
import { Server } from "socket.io"
import hanblebars  from "express-handlebars"
import {apiRouter} from "./routers/product.routes.js"
const PORT = 8080;
const app = express();

app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/", apiRouter);

const httpServer = app.listen(PORT, () => {
    console.log("server running in port", PORT);
  });

  const readJson = async () => {
    const data = await fs.readFile("./src/data/products.json", "utf-8");
    const products = await JSON.parse(data);
    return products;
  };
  
  const writeJson = async (data) => {
    const stringData = await JSON.stringify(data, null, "\t");
    await fs.writeFile("./src/data/products.json", stringData, "utf-8");
  };

const io = new Server(httpServer);

app.get("/", async (req, res) => {
  const products = await readJson();
  res.render("home", {products} );
});

io.on("connection", (socket) => {
    console.log("nuevo user conectado");
  
    socket.on("message", async (data) => {
      let products = await readJson()
      products.push({title: data})
      await writeJson(products)
      io.emit("paragraph", products);
    });
  });