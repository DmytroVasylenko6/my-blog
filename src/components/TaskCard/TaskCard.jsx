import React, { useCallback, useState } from 'react';
import s from './TaskCard.module.scss';
import iconClose from '../../images/svg/cross.svg';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import taskOperations from '../../redux/tasks/tasks-operations';
import Modal from '../Modal';
import { Link, useLocation } from 'react-router-dom';
import convertDate from '../../utils/convertDate';

export default function TaskCard({ id, description, createdAt, completed }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // console.log(convertDate(createdAt));

  const location = useLocation();
  const dispatch = useDispatch();

  const onDeleteTask = useCallback(
    id => dispatch(taskOperations.taskDelete(id)),
    [dispatch],
  );

  return (
    <>
      <div className={s.singleTaskContainer}>
        <button className={s.buttonClose} onClick={handleOpenModal}>
          <img src={iconClose} alt="icon cross" />
        </button>
        <Link
          className={s.link}
          to={{
            pathname: location.pathname + '/' + id,
            state: { from: location },
          }}>
          <p className={s.singleTaskText}>{description}</p>
        </Link>
        <div className={s.footerCard}>
          <time className={s.time} dateTime={createdAt}>
            {convertDate(createdAt)}
          </time>
          {completed ? (
            <span className={s.completed}>Completed</span>
          ) : (
            <span className={s.pending}>Pending</span>
          )}
        </div>
      </div>
      <Modal
        onDelete={() => onDeleteTask(id)}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </>
  );
}

TaskCard.propTypes = {
  description: PropTypes.string,
};
