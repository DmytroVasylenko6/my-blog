import { useCallback, useState } from 'react';
import s from './TaskCard.module.scss';
import iconClose from '../../images/svg/cross.svg';
import { useAppDispatch } from '../../hooks/redux-hooks';
import taskOperations from '../../redux/tasks/tasks-operations';
import Modal from '../Modal';
import { Link, useLocation } from 'react-router-dom';
import convertDate from '../../utils/convertDate';
import Loader from 'react-loader-spinner';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

interface IProp {
  id: string | number;
  description: string;
  createdAt: string;
  completed: boolean;
}

export default function TaskCard({
  id,
  description,
  createdAt,
  completed,
}: IProp) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const onDeleteTask = useCallback(
    async id => {
      handleCloseModal();
      setIsLoading(true);
      await dispatch(taskOperations.taskDelete(id));
      setIsLoading(false);
    },
    [dispatch],
  );

  return (
    <>
      <div
        className={classNames(
          [s.singleTaskContainer, 'theme-light-border'].join(' '),
        )}>
        <button
          data-testid="button-delete"
          className={s.buttonClose}
          onClick={handleOpenModal}>
          <img src={iconClose} alt="icon cross" />
        </button>
        <Link
          className={s.link}
          to={{
            pathname: location.pathname + '/' + id,
            state: { from: location },
          }}>
          <p
            className={classNames(
              [s.singleTaskText, 'theme-light-text'].join(' '),
            )}>
            {description}
          </p>
        </Link>
        <div className={s.footerCard}>
          <time className={s.time} dateTime={createdAt}>
            {convertDate(createdAt)}
          </time>
          {completed ? (
            <span
              className={classNames(
                [s.completed, 'theme-light-completed'].join(' '),
              )}>
              <FormattedMessage
                id="app.taskcard.completed"
                defaultMessage="Completed"
              />
            </span>
          ) : (
            <span
              className={classNames(
                [s.pending, 'theme-light-incompleted'].join(' '),
              )}>
              <FormattedMessage
                id="app.taskcard.incompleted"
                defaultMessage="Incompleted"
              />
            </span>
          )}
        </div>
        {isLoading && (
          <div className={s.loaderContainer}>
            <Loader type="ThreeDots" color="#fc842d" height="100%" width={40} />
          </div>
        )}
      </div>
      <Modal
        onDelete={() => onDeleteTask(id)}
        open={openModal}
        handleClose={handleCloseModal}
        title={
          <FormattedMessage
            id="app.taskcard.modal.title"
            defaultMessage="Are you sure you want to delete this task?"
          />
        }
      />
    </>
  );
}
