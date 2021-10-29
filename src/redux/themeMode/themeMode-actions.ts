import { createAction } from '@reduxjs/toolkit';
import ITheme from './themeMode-types';

const themeModeAction = createAction(
  'theme/changeTheme',
  withPayloadType<ITheme>(),
);

export default themeModeAction;

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
