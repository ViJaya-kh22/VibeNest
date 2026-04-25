const { param } = require('express-validator');
const validateResult = require('./validateResult');

const albumIDValidation = [
  param("albumID")
    .isMongoId()
    .withMessage("Invalid Album ID"),

  validateResult
];

module.exports = { albumIDValidation };