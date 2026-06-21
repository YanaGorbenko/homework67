import { Joi, Segments } from 'celebrate';
import { PRIORITYS } from '../constants/index.js';
import { isValidObjectId } from 'mongoose';

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid id!');

export const getTasksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(25).default(3),
    sortBy: Joi.string().valid('title', 'progress').default('title'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    priority: Joi.string().valid(...PRIORITYS),
    completed: Joi.boolean(),
    minProgress: Joi.number().integer().min(0).max(100),
    maxProgress: Joi.number().integer().min(0).max(100),
    search: Joi.string(),
  }),
};

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Field title is required',
    }),
    priority: Joi.string()
      .valid(...PRIORITYS)
      .required(),
    progress: Joi.number().min(0).max(100),
    completed: Joi.boolean(),
  }),
};

export const updateTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50),
    priority: Joi.string().valid(...PRIORITYS),
    progress: Joi.number().min(0).max(100),
    completed: Joi.boolean(),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(validateId).required(),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(validateId).required(),
  }),
};
