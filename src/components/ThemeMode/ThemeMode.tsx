import {useMemo} from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import getTheme from '../../redux/themeMode/themeMode-selector';
import themeModeAction from '../../redux/themeMode/themeMode-actions';
import s from './ThemeMode.module.scss';


export default function ThemeMode() {
    const dispatch = useAppDispatch();

  const mode = useAppSelector(getTheme);

    const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        dispatch(themeModeAction(mode === 'light' ? { current: 'dark' } : { current: 'light' }))
      },
    }),
    [dispatch, mode],
  );

    return (
    <div className={s.buttonContainer}>
      <IconButton  onClick={colorMode.toggleColorMode} >
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
    </div>
    )
}
