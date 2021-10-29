import { RootState } from '../store';

const getTheme = (state: RootState) => state.theme.current;

export default getTheme;
