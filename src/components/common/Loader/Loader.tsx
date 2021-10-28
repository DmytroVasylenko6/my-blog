import { CSSTransition } from 'react-transition-group';
import s from './Loader.module.scss';

export default function Loader() {
  return (
    <CSSTransition timeout={500} classNames="my-node">
      <div className={s.loaderOverlay}>
        <div className={s.ldsRoller}>
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
