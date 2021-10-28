import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import authSelectors from '../../redux/auth/auth-selectors';

interface IProp {
  children: {} | [];
  redirectTo: string;
  [x: string]: any;
}

export default function PrivateRoute({
  children,
  redirectTo,
  ...routeProps
}: IProp) {
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {isAuthenticated ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
