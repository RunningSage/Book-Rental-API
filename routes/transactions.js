<<<<<<< HEAD
import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { getAllTransactions, issueController, returnController } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/issue", protect, issueController);
router.post("/return", protect, returnController);
router.get("/date-range", protect, restrictTo("admin"), getAllTransactions);

export default router;
=======
import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { getAllTransactions, issueController, returnController } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/issue", protect, issueController);
router.post("/return", protect, returnController);
router.get("/date-range", protect, restrictTo("admin"), getAllTransactions);

export default router;
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
