import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import UserInfo from '../UserInfo';
import SiteNavigation from '../SiteNavigation';
import AuthNavigation from '../AuthNavigation';

import s from './MobileMenu.module.scss';

export default function MobileMenu({
  isOpen,
  isWide,
  onClick,
  isAuthenticated,
}) {
  const nav = useRef(null);
  const body = document.querySelector('body');

  if (isOpen && isWide) {
    body.classList.add('scroll-hidden');
  } else {
    body.classList.remove('scroll-hidden');
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
      <div ref={nav} className={s.mobileNav} id="header_nav">
        {isWide && (isAuthenticated ? <UserInfo /> : <AuthNavigation />)}
        <SiteNavigation />
      </div>
    </CSSTransition>
  );
}
