import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';
import Logo from '../../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import UserInfo from '../UserInfo';
import AuthNavigation from '../AuthNavigation';
import SiteNavigation from '../SiteNavigation';
import { Grid } from '@mui/material';
import authOperations from '../../redux/auth/auth-operation';
import { useMedia } from 'react-use';
import classNames from 'classnames';
import MobileMenu from '../MobileMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  const isWide = useMedia('(max-width: 900px)');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(authOperations.getAvatar(user._id));
  }, [dispatch, user._id, isAuthenticated]);

  const lines = ['lines'];

  if (isOpen) {
    lines.push('active');
  }

  const toggling = () => setIsOpen(!isOpen);
  const handleClickNavItem = e => {
    if (e.target.nodeName === 'A' || e.target.nodeName === 'BUTTON') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <img
                  className={s.logo}
                  src={Logo}
                  alt="logo"
                  height="60"
                  width="60"
                />
              </Grid>
              {!isWide && (
                <Grid item>
                  <SiteNavigation />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            {!isWide && (isAuthenticated ? <UserInfo /> : <AuthNavigation />)}
          </Grid>

          {isWide && (
            <Grid item>
              <div
                onClick={() => toggling()}
                className={classNames(lines.join(' '))}
                role="button"
                aria-label="toggle menu button"
                aria-expanded={isOpen}
                aria-controls="header_nav">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>

      {isWide && (
        <MobileMenu
          isOpen={isOpen}
          isWide={isWide}
          isAuthenticated={isAuthenticated}
          onClick={handleClickNavItem}
        />
      )}
    </header>
  );
}
