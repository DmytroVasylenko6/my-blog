import { INewTask } from '../redux/tasks/task-types';
const axios = require('axios');

axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com';

interface IStatus {
  completed: boolean;
}

const getAllTasks = () => axios.get('/task');

const addNewTask = (newTask: INewTask) => axios.post('/task', newTask);

const deleteTask = (id: string | number) => axios.delete(`/task/${id}`);

const getTaskById = (id: string | number) => axios.get(`/task/${id}`);

const updateTaskById = (id: string | number, status: IStatus) =>
  axios.put(`/task/${id}`, status);

const todosAPI = {
  getAllTasks,
  addNewTask,
  deleteTask,
  getTaskById,
  updateTaskById,
};

export default todosAPI;
