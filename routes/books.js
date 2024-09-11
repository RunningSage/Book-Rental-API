import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  bookInfoDisplayer,
  bookRentCalculator,
  getAllBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../controllers/booksController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", protect, restrictTo("admin"), addBook);
router.patch("/:id", protect, restrictTo("admin"), updateBook);
router.delete("/:id", protect, restrictTo("admin"), deleteBook);
router.get("/:book_name/info", protect, bookInfoDisplayer);
router.get(
  "/:book_name/rent",
  protect,
  restrictTo("admin"),
  bookRentCalculator
);

export default router;
