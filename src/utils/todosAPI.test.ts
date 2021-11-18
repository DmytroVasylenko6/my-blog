import todosAPI from './todosAPI';
const axios = require('axios');

interface ITodo {
  id: string | number;
  description: string;
  createdAt: string;
  completed: boolean;
}

interface IAllTasksResponse {
  data: ITodo[];
}

interface IOneTaskResponse {
  data: ITodo;
}

jest.mock('axios');

describe('TODOS API:', () => {
  let todo: ITodo;

  beforeEach(() => {
    todo = {
      id: '1',
      description: 'test',
      createdAt: '20-09-1991',
      completed: true,
    };
  });
  test('should return all tasks', async () => {
    let todos: ITodo[] = [
      {
        id: '1',
        description: 'test',
        createdAt: '20-09-1991',
        completed: true,
      },
    ];
    let resp: IAllTasksResponse = { data: todos };
    axios.get.mockResolvedValue(resp);

    const response = await todosAPI.getAllTasks();
    expect(response.data).toEqual(todos);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/task');
  });

  test('must add one task', async () => {
    let resp: IOneTaskResponse = { data: todo };
    axios.post.mockResolvedValue(resp);

    const response = await todosAPI.addNewTask(todo);
    expect(response.data).toEqual(todo);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/task', todo);
  });

  test('should delete one task', async () => {
    interface IDeleteTaskResp {
      data: string;
    }
    let resp: IDeleteTaskResp = { data: 'success' };
    axios.delete.mockResolvedValue(resp);

    const response = await todosAPI.deleteTask(todo.id);
    expect(response.data).toEqual('success');
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(`/task/${todo.id}`);
  });

  test('should return one task by id', async () => {
    let resp: IOneTaskResponse = { data: todo };
    axios.get.mockResolvedValue(resp);

    const response = await todosAPI.getTaskById(todo.id);
    expect(response.data).toEqual(todo);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`/task/${todo.id}`);
  });

  test('must update the task', async () => {
    let resp: IOneTaskResponse = { data: todo };
    axios.put.mockResolvedValue(resp);

    const response = await todosAPI.updateTaskById(`${todo.id}`, {
      completed: true,
    });
    expect(response.data).toEqual(todo);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(`/task/${todo.id}`, {
      completed: true,
    });
  });
});
