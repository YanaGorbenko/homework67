import { Task } from '../db/models/Task.js';
import createHttpError from 'http-errors';
import {
  addTaskService,
  deleteTaskService,
  getTaskServiceById,
  getTasksService,
  updateTaskService,
} from '../services/tasks.js';

export const getTasks = async (req, res) => {
  const {
    page,
    perPage,
    sortBy,
    sortOrder,
    priority,
    completed,
    minProgress,
    maxProgress,
    search,
  } = req.query;
  const authorId = req.user._id;
  const response = await getTasksService({
    page,
    perPage,
    sortBy,
    sortOrder,
    priority,
    completed,
    minProgress,
    maxProgress,
    search,
    authorId,
  });
  res.json(response);
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const task = await getTaskServiceById(taskId, authorId);
  if (!task) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const authorId = req.user._id;
  const newTask = await addTaskService({ ...body, authorId });
  res.status(201).json(newTask);
};

export const patchTask = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const body = req.body;
  const result = await updateTaskService(taskId, authorId, body);
  if (!result) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(result.data);
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const task = await deleteTaskService(taskId, authorId);
  if (!task) {
    throw createHttpError(404, 'Task not found!');
  }
  res.json(task);
};

export const putTask = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const body = req.body;
  const { data, isUpdated } = await updateTaskService(taskId, authorId, body, {
    upsert: true,
  });
  res.status(isUpdated ? 200 : 201).json(data);
};
