const joi = require('joi');

module.exports = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required()
})