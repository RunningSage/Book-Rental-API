<<<<<<< HEAD
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
=======
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
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
