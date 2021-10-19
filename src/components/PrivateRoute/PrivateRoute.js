import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default function PrivateRoute({ children, redirectTo, ...routeProps }) {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {({ match }) => {
        console.log(match);
        return (
          <CSSTransition
            in={match != null}
            timeout={300}
            classNames="page"
            unmountOnExit>
            {isAuthenticated ? children : <Redirect to={redirectTo} />}
          </CSSTransition>
        );
      }}
    </Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  redirectTo: PropTypes.string,
};
