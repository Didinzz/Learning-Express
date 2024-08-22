const Joi = require("joi");

module.exports = Joi.object({
  place: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
  }).required(),
});
