import PropTypes from 'prop-types';
import s from './Container.module.scss';

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
};

export default Container;
