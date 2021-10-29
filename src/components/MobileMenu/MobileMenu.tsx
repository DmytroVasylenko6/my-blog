import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import UserInfo from '../UserInfo';
import SiteNavigation from '../SiteNavigation';
import AuthNavigation from '../AuthNavigation';
import s from './MobileMenu.module.scss';
import ThemeMode from '../ThemeMode';
import classNames from 'classnames';

interface IProps {
  isOpen: boolean;
  isWide: boolean;
  isAuthenticated: boolean;
  onClick(e: unknown): void;
}

export default function MobileMenu({
  isOpen,
  isWide,
  onClick,
  isAuthenticated,
}: IProps) {
  const nav = useRef(null);
  const body = document.querySelector('body');

  if (body) {
    if (isOpen && isWide) {
    body.classList.add('scroll-hidden');
  } else {
    body.classList.remove('scroll-hidden');
  }
  }

  useEffect(() => {
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
      <div ref={nav} className={classNames([s.mobileNav, 'nav-menu'].join(' '))} id="header_nav">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {isWide && (isAuthenticated ? <UserInfo /> : <AuthNavigation />)}
          <ThemeMode/>
        </div>
        <SiteNavigation />
      </div>
    </CSSTransition>
  );
}
