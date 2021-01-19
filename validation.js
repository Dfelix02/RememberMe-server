const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const todoValidation = (data) => {
  const schema = Joi.object({
    body: Joi.string().max(255).required(),
  });
  return schema.validate(data);
};

module.exports.todoValidation = todoValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
