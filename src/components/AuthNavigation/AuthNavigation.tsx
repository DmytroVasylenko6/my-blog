import routes from '../../utils/routes';
import { NavLink } from 'react-router-dom';
import s from './AuthNavigation.module.scss';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

const AuthNavigation = () => {
  return (
    <div data-testid="auth-nav" className={s.authNavContainer}>
      <NavLink
        to={routes.login}
        className={classNames(
          [s.loginLink, 'theme-light-text', 'theme-light-hover'].join(' '),
        )}>
        <FormattedMessage id="app.header.nav.login" defaultMessage="Log in" />
      </NavLink>
      <NavLink
        to={routes.register}
        className={classNames(
          [s.registerLink, 'theme-light-text', 'theme-light-hover'].join(' '),
        )}>
        <FormattedMessage
          id="app.header.nav.register"
          defaultMessage="Register"
        />
      </NavLink>
    </div>
  );
};

export default AuthNavigation;
