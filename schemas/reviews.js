const Joi = require("joi");

module.exports = Joi.object({
    review: Joi.object({
        rating: Joi.number().max(10).min(1).required(),
        body: Joi.string().required(),
    }).required(),
});
