import axios from 'axios';

axios.defaults.baseURL = 'https://api-nodejs-todolist.herokuapp.com';

const getAllTasks = () => axios.get('/task');

const addNewTask = newTask => axios.post('/task', newTask);

const deleteTask = id => axios.delete(`/task/${id}`);

const getTaskById = id => axios.get(`/task/${id}`);

const updateTaskById = (id, data) => axios.put(`/task/${id}`, data);

const todosAPI = {
  getAllTasks,
  addNewTask,
  deleteTask,
  getTaskById,
  updateTaskById,
};

export default todosAPI;
