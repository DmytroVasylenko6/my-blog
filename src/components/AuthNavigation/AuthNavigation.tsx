import routes from '../../utils/routes';
import { NavLink } from 'react-router-dom';
import s from './AuthNavigation.module.scss';

const AuthNavigation = () => {
  return (
    <div className={s.authNavContainer}>
      <NavLink to={routes.login} className={s.loginLink}>
        Log in
      </NavLink>
      <NavLink to={routes.register} className={s.registerLink}>
        Register
      </NavLink>
    </div>
  );
};

export default AuthNavigation;
