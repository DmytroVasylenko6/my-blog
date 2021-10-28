import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import authOperations from '../../redux/auth/auth-operation';
import authSelectors from '../../redux/auth/auth-selectors';
import s from './UserInfo.module.scss';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import defaultAvatar from '../../images/default-user.png';

export default function UserInfo() {
  const user = useAppSelector(authSelectors.getUser);
  const avatar = useAppSelector(authSelectors.getAvatar);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(
    () => dispatch(authOperations.logOut()),
    [dispatch],
  );

  return (
    <div className={s.useInfoContainer}>
      <Link className={s.link} to={routes.account}>
        {defaultAvatar && (
          <img
            className={s.avatar}
            src={avatar ? avatar : defaultAvatar}
            alt="mini-avatar"
          />
        )}

        <span className={s.nickName}>{user.name}</span>
      </Link>
      <button onClick={() => onLogout()} className={s.logOutButton}>
        Logout
      </button>
    </div>
  );
}
