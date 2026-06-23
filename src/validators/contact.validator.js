const {
  body,
} = require("express-validator");

exports.contactValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage(
      "Message must be at least 10 characters"
    ),
];