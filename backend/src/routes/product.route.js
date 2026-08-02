import express from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getSellerProducts,
} from "../controllers/product.controller.js";
import { createProductValidation } from "../validator/product.validator.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
router.post(
  "/create",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidation,
  createProduct,
);

router.get("/", authenticateSeller, getSellerProducts);

export default router;
