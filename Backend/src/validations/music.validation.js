const { body } = require('express-validator');
const validateResult = require('./validateResult');

const musicValidation =[
    body("title")
    .notEmpty()
    .withMessage("Song title is required"),

    body("genere")
    .notEmpty()
    .withMessage("Gener is required"),

    validateResult
]

module.exports = {musicValidation}

