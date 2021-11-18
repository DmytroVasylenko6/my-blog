import taskOperations from './tasks-operations';
import { INewTask, ITask } from './task-types';

import { store } from '../store';
const axios = require('axios');

jest.mock('axios');

const task: INewTask = {
  description: 'test',
};

const tasks: ITask[] = [
  {
    completed: false,
    _id: 1,
    description: 'test',
    owner: 'admin',
    createdAt: '21.10.2021',
    updatedAt: '21.10.2021',
  },
];

const resp: any = {
  data: {
    data: tasks,
  },
};

const respOneTask: any = {
  data: {
    data: tasks[0],
  },
};

describe('must get all tasks:', () => {
  it('should return a successful response', async () => {
    const state: any = store.getState();
    expect(state.tasks.length).toBe(0);

    axios.get.mockResolvedValue(resp);
    await store.dispatch(taskOperations.taskParse());
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(1);
  });

  it('should return an error response', async () => {
    const state: any = store.getState();
    expect(state.tasks.length).toBe(1);

    axios.get.mockRejectedValue(resp);

    await store.dispatch(taskOperations.taskParse());
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(1);
  });
});

describe('should add a new task', () => {
  it('should return a successful response', async () => {
    const state: any = store.getState();
    expect(state.tasks.length).toBe(1);

    axios.post.mockResolvedValue(respOneTask);

    await store.dispatch(taskOperations.taskAdd(task));
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(2);
  });

  it('should return an error response', async () => {
    const state: any = store.getState();
    expect(state.tasks.length).toBe(2);

    axios.post.mockRejectedValue(resp);

    await store.dispatch(taskOperations.taskAdd(task));
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(2);
  });
});

describe('should delete the task by id', () => {
  it('should return a successful response', async () => {
    const state: any = store.getState();

    expect(state.tasks.length).toBe(2);

    axios.delete.mockResolvedValue('success');

    await store.dispatch(taskOperations.taskDelete(1));
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(0);
  });

  it('should return an error response', async () => {
    const state: any = store.getState();
    expect(state.tasks.length).toBe(0);

    axios.delete.mockRejectedValue(resp);

    await store.dispatch(taskOperations.taskDelete(1));
    const updatedState = store.getState();
    expect(updatedState.tasks.length).toBe(0);
  });
});
