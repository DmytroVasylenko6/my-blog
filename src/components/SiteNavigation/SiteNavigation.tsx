import s from './SiteNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import routes from '../../utils/routes';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

export default function SiteNavigation() {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink
            exact
            to={routes.home}
            activeClassName={classNames(
              [s.activeNavLink, 'theme-light-link-active'].join(' '),
            )}
            className={classNames(
              [s.navLink, 'theme-light-text', 'theme-light-hover'].join(' '),
            )}>
            <FormattedMessage id="app.header.nav.home" defaultMessage="Home" />
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink
            to={routes.todos}
            activeClassName={classNames(
              [s.activeNavLink, 'theme-light-link-active'].join(' '),
            )}
            className={classNames(
              [s.navLink, 'theme-light-text', 'theme-light-hover'].join(' '),
            )}>
            <FormattedMessage
              id="app.header.nav.tasks"
              defaultMessage="Tasks"
            />
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink
            to={routes.account}
            activeClassName={classNames(
              [s.activeNavLink, 'theme-light-link-active'].join(' '),
            )}
            className={classNames(
              [s.navLink, 'theme-light-text', 'theme-light-hover'].join(' '),
            )}>
            <FormattedMessage
              id="app.header.nav.account"
              defaultMessage="Account"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
