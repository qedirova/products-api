import express from "express";
import { logger } from "./middlewares/logger.js";
import { productsRouter } from "./routes/products.router.js";
import { commentsRouter } from "./comments.router.js";

const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());
app.use(logger);

// routes
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hello world from Banu Products API! 🚀");
});

// app.method(url, ...middlewares)

app.listen(PORT, () => {
  console.log("Server is running");
});
