import { Joi, Segments } from 'celebrate';

export const signUpSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
  }),
};

export const signInSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
