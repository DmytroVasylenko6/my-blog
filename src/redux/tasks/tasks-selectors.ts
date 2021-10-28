import { RootState } from '../store';

const getTasks = (state: RootState) => state.tasks;

export default getTasks;
