import taskActions from './tasks-actions';
import todosAPI from '../../utils/todosAPI';
import notifInfo from '../notification/notif-actions';

const taskParse = task => async dispatch => {
  dispatch(taskActions.parseTaskRequest());

  try {
    const tasks = await todosAPI.getAllTasks();
    // console.log(tasks);
    dispatch(taskActions.parseTaskSuccess(tasks.data.data));
  } catch (error) {
    dispatch(taskActions.parseTaskError(error));
  }
};

const taskAdd = newTask => async dispatch => {
  dispatch(taskActions.addTaskRequest());

  try {
    const response = await todosAPI.addNewTask(newTask);
    dispatch(taskActions.addTaskSuccess(response.data.data));
    dispatch(
      notifInfo({
        message: 'Task successfully added!',
        status: true,
        severity: 'success',
      }),
    );
  } catch (error) {
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

const taskDelete = id => async dispatch => {
  dispatch(taskActions.deleteTaskRequest());

  try {
    const response = await todosAPI.deleteTask(id);
    // console.log(response);
    dispatch(taskActions.deleteTaskSuccess(id));
    dispatch(
      notifInfo({
        message: 'Task successfully deleted!',
        status: true,
        severity: 'success',
      }),
    );
    return response;
  } catch (error) {
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
