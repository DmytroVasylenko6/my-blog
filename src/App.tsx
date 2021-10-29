import  { Suspense, lazy, useEffect } from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import paths from './utils/routes';
import authOperations from './redux/auth/auth-operation';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import Header from './components/Header';
import Notification from './components/Notification';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from './components/common/Loader';
import { ThemeProvider } from '@mui/material/styles';
import { themeDark, themeLight } from './utils/themeStyles';
import getTheme from './redux/themeMode/themeMode-selector';




const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const TasksPage = lazy(() =>
  import('./pages/TasksPage' /* webpackChunkName: "tasks-page" */),
);
const SingleTaskPage = lazy(() =>
  import('./pages/SingleTaskPage' /* webpackChunkName: "singleTask-page" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);
const AccountPage = lazy(() =>
  import('./pages/AccountPage' /* webpackChunkName: "account-page" */),
);


const App = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();

  const mode = useAppSelector(getTheme);

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else if (mode === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  }, [mode]);


  return (
      <ThemeProvider theme={mode === 'dark' ? themeDark : themeLight}>
      <Header />

      <TransitionGroup component="main">
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={500}
          appear={true}
          unmountOnExit>
          <Suspense fallback={<Loader />}>
            <Switch location={location}>
              <PrivateRoute exact path={paths.home} redirectTo={paths.login}>
                <HomePage />
              </PrivateRoute>

              <PrivateRoute exact path={paths.todos} redirectTo={paths.login}>
                <TasksPage />
              </PrivateRoute>

              <PrivateRoute
                exact
                path={paths.singleTodos}
                redirectTo={paths.login}>
                <SingleTaskPage />
              </PrivateRoute>

              <PrivateRoute exact path={paths.account} redirectTo={paths.login}>
                <AccountPage />
              </PrivateRoute>

              <PublicRoute
                path={paths.register}
                restricted
                redirectTo={paths.home}>
                <RegisterPage />
              </PublicRoute>

              <PublicRoute
                path={paths.login}
                restricted
                redirectTo={paths.home}>
                <LoginPage />
              </PublicRoute>

              <Redirect to="/" />
            </Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>

      <Notification />
    </ThemeProvider>
  );
};

export default App;
