
import s from './CustomError.module.scss';

interface IProps {
  children: string
}

function CustomError({ children }: IProps) {
  return <div className={s.text}>{children}</div>;
}


export default CustomError;
