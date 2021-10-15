import PropTypes from 'prop-types';
import s from './CustomError.module.scss';

function CustomError({ children }) {
  return <div className={s.text}>{children}</div>;
}

CustomError.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default CustomError;
