import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import UserInfo from '../UserInfo';
import SiteNavigation from '../SiteNavigation';
import AuthNavigation from '../AuthNavigation';
import s from './MobileMenu.module.scss';
import ThemeMode from '../ThemeMode';
import classNames from 'classnames';
import LanguageSelect from '../LanguageSelect';
import { disableScroll, enableScroll } from '../../utils/disable&enableScroll';

interface IProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  onClick(e: unknown): void;
}

export default function MobileMenu({
  isOpen,
  onClick,
  isAuthenticated,
}: IProps) {
  const nav = useRef(null);

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    const navigationEl = document.getElementById('header_nav');
    if (navigationEl) {
      navigationEl.addEventListener('click', onClick);
    }
    return () => {
      if (navigationEl) {
        navigationEl.removeEventListener('click', onClick);
      }
    };
  });

  return (
    <CSSTransition
      nodeRef={nav}
      in={isOpen}
      timeout={500}
      classNames="burger-animation"
      unmountOnExit>
      <div
        data-testid="header_nav"
        ref={nav}
        className={classNames([s.mobileNav, 'nav-menu'].join(' '))}
        id="header_nav">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isAuthenticated ? <UserInfo /> : <AuthNavigation />}
          <ThemeMode />
          <LanguageSelect />
        </div>
        <SiteNavigation />
      </div>
    </CSSTransition>
  );
}
