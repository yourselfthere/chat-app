import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile); //protectRoute is a middleware to check when user is authenticated
export default router;
