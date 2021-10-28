
import s from './Container.module.scss';

interface IProp {
  children: string | {} | []
}

function Container({ children }: IProp) {
  return <div className={s.container}>{children}</div>;
}



export default Container;
