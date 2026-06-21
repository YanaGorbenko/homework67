import { Router } from 'express';

import {
  addTask,
  deleteTask,
  getTaskById,
  getTasks,
  patchTask,
  putTask,
} from '../controllers/tasks.js';
import {
  createTaskSchema,
  getTasksSchema,
  idSchema,
  updateTaskSchema,
} from '../validation/task.js';
import { celebrate } from 'celebrate';
import { checkToken } from '../middlewares/checkToken.js';

const tasksRouter = Router();
tasksRouter.use(checkToken);

tasksRouter.get('/', celebrate(getTasksSchema), getTasks);

tasksRouter.get('/:taskId', celebrate(idSchema), getTaskById);

tasksRouter.delete('/:taskId', celebrate(idSchema), deleteTask);

tasksRouter.post('/', celebrate(createTaskSchema), addTask);

tasksRouter.patch('/:taskId', celebrate(updateTaskSchema), patchTask);

tasksRouter.put(
  '/:taskId',
  celebrate(createTaskSchema),
  celebrate(idSchema),
  putTask,
);

export default tasksRouter;
