import express from "express";
import { createUser, loginUser, logOutCurrentUser, getUser } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/').post(createUser).get(authenticate,  authorizeAdmin, getUser);
router.post('/auth', loginUser);
router.post('/logout', logOutCurrentUser);

export default router;