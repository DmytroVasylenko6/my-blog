import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import authSelectors from '../../redux/auth/auth-selectors';
import PropTypes from 'prop-types';

interface IProp {
  children: {} | [];
  redirectTo: string;
  [x: string]: any;
}

export default function PublicRoute({
  children,
  redirectTo,
  ...routeProps
}: IProp) {
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {isAuthenticated && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
}

PublicRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  redirectTo: PropTypes.string,
};
