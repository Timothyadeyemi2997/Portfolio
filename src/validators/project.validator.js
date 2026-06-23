const {
  body,
} = require("express-validator");

exports.createProjectValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),
];

exports.updateProjectValidator = [
  body("title")
    .optional()
    .notEmpty(),

  body("description")
    .optional()
    .notEmpty(),
];