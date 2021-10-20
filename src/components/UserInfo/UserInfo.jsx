import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operation';
import authSelectors from '../../redux/auth/auth-selectors';
import s from './UserInfo.module.scss';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import defaultAvatar from '../../images/default-user.png';

export default function UserInfo() {
  const user = useSelector(authSelectors.getUser);
  const avatar = useSelector(authSelectors.getAvatar);
  const dispatch = useDispatch();

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
