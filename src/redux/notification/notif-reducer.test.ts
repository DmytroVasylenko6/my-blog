import notifStatusReducer from './notif-reducer';
import notifInfo from './notif-actions';
import INotif from './notif-types';

const initialState: INotif = {
  status: false,
  message: '',
  severity: 'info',
};

test('should change the theme value', () => {
  const notif: INotif = { status: true, message: 'test', severity: 'error' };
  const result = notifStatusReducer(initialState, notifInfo(notif));
  expect(result).toEqual(notif);
});
