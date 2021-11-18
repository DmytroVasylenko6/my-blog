import tasksReducer from './tasks-reducer';
import taskActions from './tasks-actions';
import { IDataTask, ITask, IParseTask } from './task-types';

describe('Task reducer:', () => {
  let initialState: ITask[];
  let todos: ITask[];

  beforeEach(() => {
    initialState = [] as ITask[];
    todos = [
      {
        completed: false,
        _id: 1,
        description: 'test',
        owner: 'admin',
        createdAt: '21.10.2021',
        updatedAt: '21.10.2021',
      },
    ];
  });
  test('must write down all tasks', () => {
    let res: IParseTask = {
      data: todos,
    };
    const taskList = tasksReducer(
      initialState,
      taskActions.parseTaskSuccess(res),
    );
    expect(taskList.length).toBe(1);
    expect(taskList).toEqual(todos);
  });

  test('should write a new task', () => {
    let task: IDataTask = { data: todos[0] };
    const taskList = tasksReducer(todos, taskActions.addTaskSuccess(task));
    expect(taskList.length).toBe(2);
    expect(taskList).toEqual([...todos, task.data]);
  });

  test('should delete one task', () => {
    let taskID = todos[0]._id;
    const taskList = tasksReducer(todos, taskActions.deleteTaskSuccess(taskID));
    expect(taskList.length).toBe(0);
    expect(taskList).toEqual([]);
  });
});
