import Joi from "joi";

const bookValid = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
});

export default bookValid;