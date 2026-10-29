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

import { Router } from "express";
import { comments } from "./db/products.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const router = Router();

app.get("/", (req, res) => {
  const limit = Number(req.query.limit);

  if (limit > 0 && !isNaN(limit)) {
    return res.json(comments.slice(0, limit));
  }

  return res.json(comments);
});
app.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const comment = comments.find((c) => c.id === id);

  if (!comment) {
    return res.status(404).json({
      error: "Comment not found",
    });
  }

  return res.json(comment);
});
app.post("/create", authMiddleware, (req, res) => {
  const { text, author, productId } = req.body;

  if (
    typeof text !== "string" ||
    !text.trim() ||
    typeof author !== "string" ||
    !author.trim() ||
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    return res.status(400).json({
      error: "Valid text, author and productId are required",
    });
  }

  const newComment = {
    id: comments.length ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
    text: text.trim(),
    author: author.trim(),
    productId,
  };

  comments.push(newComment);

  return res.status(201).json({
    message: "Comment successfully created",
    comment: newComment,
  });
});
app.patch("/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const comment = comments.find((c) => c.id === id);

  if (!comment) {
    return res.status(404).json({
      error: "Comment not found",
    });
  }

  const { text, author, productId } = req.body;

  if (
    (text !== undefined && (typeof text !== "string" || !text.trim())) ||
    (author !== undefined && (typeof author !== "string" || !author.trim())) ||
    (productId !== undefined &&
      (!Number.isInteger(productId) || productId <= 0))
  ) {
    return res.status(400).json({
      error: "Invalid comment data",
    });
  }

  if (text !== undefined) comment.text = text.trim();
  if (author !== undefined) comment.author = author.trim();
  if (productId !== undefined) comment.productId = productId;

  return res.status(200).json({
    message: "Comment successfully updated",
    comment,
  });
});
app.delete("/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const index = comments.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Comment not found",
    });
  }

  const deleted = comments.splice(index, 1);

  return res.json({
    message: "Comment successfully deleted",
    comment: deleted[0],
  });
});

export { router as commentsRouter };

// app.method(url, ...middlewares)

app.listen(PORT, () => {
  console.log("Server is running");
});
