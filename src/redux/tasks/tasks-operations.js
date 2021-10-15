import axios from 'axios';
import taskActions from './tasks-actions';

const taskParse = task => async dispatch => {
  dispatch(taskActions.parseTaskRequest());

  try {
    const tasks = await axios.get('/task');
    console.log(tasks);
    dispatch(taskActions.parseTaskSuccess(tasks.data.data));
  } catch (error) {
    dispatch(taskActions.parseTaskError(error));
  }
};

const taskAdd = newTask => async dispatch => {
  dispatch(taskActions.addTaskRequest());

  try {
    const response = await axios.post('/task', newTask);
    dispatch(taskActions.addTaskSuccess(response.data.data));
  } catch (error) {
    dispatch(taskActions.addTaskError(error));
  }
};

const taskDelete = id => async dispatch => {
  dispatch(taskActions.deleteTaskRequest());

  try {
    const response = await axios.delete(`/task/${id}`);
    console.log(response);
    dispatch(taskActions.deleteTaskSuccess(id));
  } catch (error) {
    dispatch(taskActions.deleteTaskError(error));
  }
};

const taskOperations = {
  taskParse,
  taskAdd,
  taskDelete,
};

export default taskOperations;
