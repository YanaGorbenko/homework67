import { Task } from '../db/models/Task.js';

export const getTasksService = async ({
  page = 1,
  perPage = 3,
  sortBy = 'title',
  sortOrder = 'asc',
  priority,
  completed,
  minProgress,
  maxProgress,
  search,
  authorId,
}) => {
  const skip = (page - 1) * perPage;

  const tasksQuery = Task.find({ authorId }).populate('authorId', 'email');
  if (search && search.trim()) {
    tasksQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }

  if (priority) {
    tasksQuery.where('priority').equals(priority);
  }

  if (completed !== undefined) {
    tasksQuery.where('completed').equals(completed);
  }
  if (minProgress) {
    tasksQuery.where('progress').gte(minProgress);
  }

  if (maxProgress) {
    tasksQuery.where('progress').lte(maxProgress);
  }
  const [totalCount, tasks] = await Promise.all([
    tasksQuery.clone().countDocuments(),
    tasksQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return { tasks, totalCount, totalPages };
};

export const getTaskServiceById = (taskId, authorId) =>
  Task.findOne({ _id: taskId, authorId }).populate(
    'authorId',
    'email createdAt',
  );

export const addTaskService = taskData => Task.create(taskData);

export const deleteTaskService = (taskId, authorId) =>
  Task.findOneAndDelete({ _id: taskId, authorId });

export const updateTaskService = async (
  taskId,
  authorId,
  taskData,
  options = {},
) => {
  const result = await Task.findOneAndUpdate(
    { _id: taskId, authorId },
    taskData,
    {
      returnDocument: 'after',
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result.value) {
    return null;
  }

  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};
