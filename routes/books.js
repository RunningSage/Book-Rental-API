import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  bookInfoDisplayer,
  bookRentCalculator,
  getAllBooks,
  addBook,
} from "../controllers/booksController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", protect, restrictTo("admin"), addBook);
router.get("/:book_name/info", protect, bookInfoDisplayer);
router.get(
  "/:book_name/rent",
  protect,
  restrictTo("admin"),
  bookRentCalculator
);

export default router;
