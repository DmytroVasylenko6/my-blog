import s from './CustomError.module.scss';

interface IProps {
  children: any;
}

function CustomError({ children }: IProps) {
  return <div className={s.text}>{children}</div>;
}

export default CustomError;
