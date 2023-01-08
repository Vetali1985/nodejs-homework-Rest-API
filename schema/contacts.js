const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(33).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9()]+$/, "numbers")
    .required(),
});
module.exports = {
  contactsSchema,
};
