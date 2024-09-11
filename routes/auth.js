<<<<<<< HEAD
import express from "express";
import { loginController, signupController } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

export default router;
=======
import express from "express";
import { loginController, signupController } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

export default router;
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
