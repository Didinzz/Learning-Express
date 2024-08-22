const joi = require('joi');

module.exports = joi.object({
    username: joi.string().required(),
    password: joi.string().required().min(5).max(10),
})