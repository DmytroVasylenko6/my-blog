import { createReducer } from '@reduxjs/toolkit';
import taskActions from './tasks-actions';

const tasksReducer = createReducer([], {
  [taskActions.parseTaskSuccess]: (state, { payload }) => payload,
  [taskActions.addTaskSuccess]: (state, { payload }) => [...state, payload],
  [taskActions.deleteTaskSuccess]: (state, { payload }) =>
    state.filter(task => task._id !== payload),
});

export default tasksReducer;
