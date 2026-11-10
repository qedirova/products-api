import { products } from "../db/products.js";
import { AppError } from "../utils/appError.js";

export const getAllProducts = (req, res) => {
  const limit = Number(req.query.limit);

  if (limit > 0 && !isNaN(limit)) {
    return res.json(products.slice(0, limit));
  } else {
    return res.json(products);
  }
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) throw new AppError("Product not found", 404);

  return res.json(product);
};

export const createProduct = (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    throw new AppError("All fields are required", 400);
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
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  Object.assign(product, req.body);

  return res.json({
    message: "Product was successfully updated",
    product,
  });
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new AppError("Product not found", 404);
  }

  const deleted = products.splice(index, 1);

  return res.json({
    message: "Product was successfully deleted",
    product: deleted[0],
  });
};
