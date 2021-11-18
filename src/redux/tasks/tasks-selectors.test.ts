import getTasks from './tasks-selectors';
import { store } from '../store';

const state = store.getState();
test('should return a list of tasks', () => {
  const taskList = getTasks(state);
  expect(taskList.length).toBe(0);
});
