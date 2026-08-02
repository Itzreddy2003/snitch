import express from "express";
import {
  validateLogin,
  validateRegistration,
} from "../validator/auth.validator.js";
import {
  getMe,
  googleAuthCallback,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleAuthCallback,
);

router.get("/me", authenticateUser, getMe);
export default router;
