import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import taskActions from './tasks-actions';
import { IDataTask, IParseTask, ITask } from './task-types';

const initialState: ITask[] = [] as ITask[];

const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(
      taskActions.parseTaskSuccess,
      (_, { payload }: PayloadAction<IParseTask>): ITask[] => payload.data,
    )
    .addCase(
      taskActions.addTaskSuccess,
      (state, { payload }: PayloadAction<IDataTask>): ITask[] => [
        ...state,
        payload.data,
      ],
    )
    .addCase(
      taskActions.deleteTaskSuccess,
      (state, { payload }: PayloadAction<string | number>): ITask[] =>
        state.filter(task => task._id !== payload),
    );
});

export default tasksReducer;
