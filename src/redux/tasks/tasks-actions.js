import { createAction } from '@reduxjs/toolkit';

const parseTaskRequest = createAction('tasks/parseTaskRequest');
const parseTaskSuccess = createAction('tasks/parseTaskSuccess');
const parseTaskError = createAction('tasks/parseTaskError');

const addTaskRequest = createAction('tasks/addTaskRequest');
const addTaskSuccess = createAction('tasks/addTaskSuccess');
const addTaskError = createAction('tasks/addTaskError');

const deleteTaskRequest = createAction('tasks/deleteTaskRequest');
const deleteTaskSuccess = createAction('tasks/deleteTaskSuccess');
const deleteTaskError = createAction('tasks/deleteTaskError');

const taskActions = {
  parseTaskRequest,
  parseTaskSuccess,
  parseTaskError,
  addTaskRequest,
  addTaskSuccess,
  addTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
};

export default taskActions;
