import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { getAllTransactions, issueController, returnController } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/issue", protect, issueController);
router.post("/return", protect, returnController);
router.get("/date-range", protect, restrictTo("admin"), getAllTransactions);

export default router;
