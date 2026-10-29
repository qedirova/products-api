import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/create", authMiddleware, createProduct);

router.patch("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

export { router as productsRouter };
