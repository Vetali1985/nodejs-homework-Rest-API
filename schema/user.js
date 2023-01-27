const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().min(3).max(33).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
module.exports = {
  userSchema,
};
