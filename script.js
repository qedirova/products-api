import express from "express";
import { products } from "./db/products.js";
import { logger } from "./middlewares/logger.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());
app.use(logger);

// public route
app.get("/", (req, res) => {
  res.send("Hello world from Banu Products API! 🚀");
});

// public route
app.get("/products", (req, res) => {
  const limit = Number(req.query.limit);

  if (limit > 0 && !isNaN(limit)) {
    return res.json(products.slice(0, limit));
  } else {
    return res.json(products);
  }
});

// public route
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product)
    return res.status(404).json({
      error: "Product not found",
    });

  return res.json(product);
});

// protected route
app.post("/products/create", authMiddleware, (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);

  return res.status(201).json({
    message: "Product successfully created",
    product: newProduct,
  });
});

// protected route

app.patch("/products/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  Object.assign(product, req.body);

  return res.status(200).json({
    message: "Product was successfully updated",
    product,
  });
});

// protected route
app.delete("/products/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const deleted = products.splice(index, 1);

  return res.json({
    message: "Product was successfully deleted",
    product: deleted[0],
  });
});

// app.method(url, ...middlewares)

app.listen(PORT, () => {
  console.log("Server is running");
});
