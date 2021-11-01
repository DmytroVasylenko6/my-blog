import { CSSTransition } from 'react-transition-group';
import s from './Loader.module.scss';
import classNames from 'classnames';

export default function Loader() {
  return (
    <CSSTransition timeout={500} classNames="my-node">
      <div className={s.loaderOverlay}>
        <div
          className={classNames([s.ldsRoller, 'theme-light-loader'].join(' '))}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </CSSTransition>
  );
}
