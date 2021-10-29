import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth-reducer';
import notifStatusReducer from './notification/notif-reducer';
import tasksReducer from './tasks/tasks-reducer';
import { IUser, TAvatar, TToken, TIsAuth } from './auth/auth-types';
import themeModeReducer from './themeMode/themeMode-reducers';
import ITheme from './themeMode/themeMode-types';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
};

interface IAuthReducer {
  user: IUser;
  token: TToken;
  avatar: TAvatar;
  isAuthenticated: TIsAuth;
}

export const store = configureStore({
  reducer: {
    auth: persistReducer<IAuthReducer, any>(authPersistConfig, authReducer),
    tasks: tasksReducer,
    notification: notifStatusReducer,
    theme: persistReducer<ITheme, any>(themePersistConfig, themeModeReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
