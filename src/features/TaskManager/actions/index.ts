import { createTask } from "./$create-task";
import { deleteTask } from "./$delete-task";
import { getTasks } from "./$get-tasks";
import { updateTaskStatus } from "./$update-task-status";

export const taskActions = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
