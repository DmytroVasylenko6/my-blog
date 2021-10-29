import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import themeModeAction from './themeMode-actions';
import ITheme from './themeMode-types';

const themeModeInitial: ITheme = {
  current: 'dark',
} as ITheme;

const themeModeReducer = createReducer(themeModeInitial, builder => {
  builder.addCase(
    themeModeAction,
    (_, { payload }: PayloadAction<ITheme>): ITheme => payload,
  );
});

export default themeModeReducer;
