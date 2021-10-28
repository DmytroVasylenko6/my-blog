import taskActions from './tasks-actions';
import todosAPI from '../../utils/todosAPI';
import notifInfo from '../notification/notif-actions';
import { AppDispatch } from '../store';
import { INewTask } from './task-types';

const taskParse = () => async (dispatch: AppDispatch) => {
  dispatch(taskActions.parseTaskRequest());

  try {
    const tasks = await todosAPI.getAllTasks();
    dispatch(taskActions.parseTaskSuccess(tasks.data));
  } catch (error: any) {
    dispatch(taskActions.parseTaskError(error));
  }
};

const taskAdd = (newTask: INewTask) => async (dispatch: AppDispatch) => {
  dispatch(taskActions.addTaskRequest());

  try {
    const response = await todosAPI.addNewTask(newTask);
    dispatch(taskActions.addTaskSuccess(response.data));
    dispatch(
      notifInfo({
        message: 'Task successfully added!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error: any) {
    dispatch(taskActions.addTaskError(error));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const taskDelete = (id: string | number) => async (dispatch: AppDispatch) => {
  dispatch(taskActions.deleteTaskRequest());

  try {
    const response = await todosAPI.deleteTask(id);
    dispatch(taskActions.deleteTaskSuccess(id));
    dispatch(
      notifInfo({
        message: 'Task successfully deleted!',
        status: true,
        severity: 'success',
      }),
    );
    return response;
  } catch (error: any) {
    dispatch(taskActions.deleteTaskError(error));
    dispatch(
      notifInfo({
        message: error.message,
        status: true,
        severity: 'error',
      }),
    );
  }
};

const taskOperations = {
  taskParse,
  taskAdd,
  taskDelete,
};

export default taskOperations;
