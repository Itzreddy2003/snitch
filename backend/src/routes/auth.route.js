import express from "express";
import { validateRegistration } from "../validator/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register",validateRegistration,registerUser);

export default router;