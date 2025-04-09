import express from "express";
import {
  login,
  signup,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile); //protectRoute is a middleware to check when user is authenticated

router.get("/check", protectRoute, checkAuth);
//will be calling the check whenever we refresh maybe something more

export default router;
