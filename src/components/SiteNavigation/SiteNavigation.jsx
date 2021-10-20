import React from 'react';
import s from './SiteNavigation.module.scss';
import { NavLink } from 'react-router-dom';
import routes from '../../utils/routes';

export default function SiteNavigation() {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink
            exact
            to={routes.home}
            activeClassName={s.activeNavLink}
            className={s.navLink}>
            Home
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink
            to={routes.todos}
            activeClassName={s.activeNavLink}
            className={s.navLink}>
            Tasks
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink
            to={routes.account}
            activeClassName={s.activeNavLink}
            className={s.navLink}>
            Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
