import express from "express";
import { logger } from "./middlewares/logger.js";
import { productsRouter } from "./routes/products.router.js";
import { commentsRouter } from "./routes/comments.router.js";
import { cryptoRouter } from "./routes/crypto.router.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
const PORT = 8000;

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://products-client-pql3.vercel.app",
    ],
  }),
);
app.use(express.json());
app.use(logger);

// routes
app.use("/products", productsRouter);
app.use("/comments", commentsRouter);
app.use("/crypto", cryptoRouter);

app.get("/", (req, res) => {
  res.send("Hello world from Banu Products API! 🚀");
});

app.use(errorMiddleware);

// app.method(url, ...middlewares)

app.listen(PORT, () => {
  console.log("Server is running");
});
