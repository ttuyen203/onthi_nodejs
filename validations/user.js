import Joi from "joi";

const userValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default userValid;
