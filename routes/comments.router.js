import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../controllers/comments.controller.js";

const router = Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/create", authMiddleware, createComment);
router.patch("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export { router as commentsRouter };
