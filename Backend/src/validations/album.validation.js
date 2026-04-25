const { body } = require('express-validator');
const validateResult = require('./validateResult');

const albumValidation = [
  body("title")
    .notEmpty()
    .withMessage("Album title is required"),

  body("music")
    .isArray({ min: 1 })
    .withMessage("Album must contain at least one song"),

  body("music.*")
    .isMongoId()
    .withMessage("Each music ID must be valid"),

  validateResult
];

module.exports = { albumValidation };