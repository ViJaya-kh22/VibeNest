const {body} = require('express-validator')
const validateResult = require('./validateResult');

const userValidation = [

    body("username")
    .notEmpty()
    .trim()
    .withMessage("Username is required")
    .isLength({min : 3 , max : 20})
    .withMessage("Username must be between 3 to 20 characters"),

    body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Inavalid eamil address"),

    body("password")
    .isLength({min : 6})
    .withMessage("Password must be at least 6 characters long"),

    body("role")
    .optional()
    .isIn(["user" , "artist"])
    .withMessage("User needs to login"),

    validateResult
]

module.exports = {userValidation};