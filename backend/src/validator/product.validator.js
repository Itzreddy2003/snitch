import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createProductValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("priceAmount")
    .isFloat({ gt: 0 })
    .withMessage("Product price amount must be a positive number"),
  body("priceCurrency")
    .notEmpty()
    .withMessage("Product price currency is required"),
  validate,
];
