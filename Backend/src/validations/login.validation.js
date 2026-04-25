const { body } = require('express-validator');
const validateResult = require('./validateResult');

const loginValidation = [

  body()
    .custom((value, { req }) => {
      if (!req.body.email && !req.body.username) {
        throw new Error("Email or Username is required");
      }
      return true;
    }),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),


  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 to 20 characters"),


  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  validateResult
];

module.exports = { loginValidation };