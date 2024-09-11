<<<<<<< HEAD
import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  myInfoHandler,
  userInfoHandler,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", protect, restrictTo("admin"), getAllUsers);
router.get("/my-info", protect, restrictTo("user"), myInfoHandler);
router.get("/:user_id", protect, restrictTo("admin"), userInfoHandler);

export default router;
=======
import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  myInfoHandler,
  userInfoHandler,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", protect, restrictTo("admin"), getAllUsers);
router.get("/my-info", protect, restrictTo("user"), myInfoHandler);
router.get("/:user_id", protect, restrictTo("admin"), userInfoHandler);

export default router;
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
