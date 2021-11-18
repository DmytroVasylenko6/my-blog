import { createAction } from '@reduxjs/toolkit';
import ITheme from './themeMode-types';

const themeModeAction = createAction(
  'theme/changeTheme',
  withPayloadType<ITheme>(),
);

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export default themeModeAction;
