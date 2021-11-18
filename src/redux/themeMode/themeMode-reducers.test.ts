import themeModeReducer from './themeMode-reducers';
import themeModeAction from './themeMode-actions';
import ITheme from './themeMode-types';

const themeModeInitial: ITheme = {
  current: 'dark',
} as ITheme;

test('should change the theme value', () => {
  const theme = themeModeReducer(
    themeModeInitial,
    themeModeAction({ current: 'light' }),
  );
  expect(theme).toEqual({ current: 'light' });
});
