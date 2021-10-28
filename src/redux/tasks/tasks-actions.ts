import { createAction } from '@reduxjs/toolkit';
import { IDataTask, IParseTask } from './task-types';

const parseTaskRequest = createAction('tasks/parseTaskRequest');
const parseTaskSuccess = createAction(
  'tasks/parseTaskSuccess',
  withPayloadType<IParseTask>(),
);
const parseTaskError = createAction(
  'tasks/parseTaskError',
  withPayloadType<string>(),
);

const addTaskRequest = createAction('tasks/addTaskRequest');
const addTaskSuccess = createAction(
  'tasks/addTaskSuccess',
  withPayloadType<IDataTask>(),
);
const addTaskError = createAction(
  'tasks/addTaskError',
  withPayloadType<string>(),
);

const deleteTaskRequest = createAction('tasks/deleteTaskRequest');
const deleteTaskSuccess = createAction(
  'tasks/deleteTaskSuccess',
  withPayloadType<string | number>(),
);
const deleteTaskError = createAction(
  'tasks/deleteTaskError',
  withPayloadType<string>(),
);

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

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
