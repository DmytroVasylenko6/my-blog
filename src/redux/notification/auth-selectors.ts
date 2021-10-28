import { RootState } from '../store';

const getNotifInfo = (state: RootState) => state.notification;

export default getNotifInfo;
