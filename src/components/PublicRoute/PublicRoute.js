import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import PropTypes from 'prop-types';

export default function PublicRoute({ children, redirectTo, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

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
