import { body, validationResult } from "express-validator";

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  next();
}

export const validateRegistration = [
  body("fullname").notEmpty().withMessage("fullname is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("contact").notEmpty().withMessage("required a 10 digit number"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password length atleast be 6 characters"),
  body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),
  validate,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("password is required"),
  validate,
];
