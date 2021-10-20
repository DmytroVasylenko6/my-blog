import React, { useState, useEffect } from 'react';
import s from './SingleTaskPage.module.scss';
import Container from '../../components/common/Container';
import convertDate from '../../utils/convertDate';
import { Typography } from '@mui/material';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import routes from '../../utils/routes';
import Modal from '../../components/Modal';
import todosAPI from '../../utils/todosAPI';
import notifInfo from '../../redux/notification/notif-actions';

function SingleTaskPage() {
  const [todo, setTodo] = useState();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const todosId = match.params.todosId;

  const dispatch = useDispatch();

  useEffect(() => {
    todosAPI
      .getTaskById(todosId)
      .then(response => {
        setTodo(response.data.data);
      })
      .catch(error => {
        dispatch(
          notifInfo({
            message: error.message,
            status: true,
            severity: 'error',
          }),
        );
      });
  }, [dispatch, todosId]);

  const onClickUpdateTask = async () => {
    todosAPI
      .updateTaskById(todosId, {
        completed: !todo?.completed,
      })
      .then(response => {
        setTodo(response.data.data);
        dispatch(
          notifInfo({
            message: 'Task successfully updated!',
            status: true,
            severity: 'success',
          }),
        );
      })
      .catch(error => {
        dispatch(
          notifInfo({
            message: error.message,
            status: true,
            severity: 'error',
          }),
        );
      });
  };

  const onClickDeleteTask = async () => {
    const response = await dispatch(taskOperations.taskDelete(todosId));
    if (response?.data?.success) {
      history.push(routes.todos);
    }
  };

  const handleGoBack = () => {
    history.push(location?.state?.from || '/');
  };

  return (
    <div className={s.singleTaskPage}>
      <Container>
        <button className={s.backButton} onClick={handleGoBack}>
          Go back
        </button>
        <Typography gutterBottom={true} variant="h1">
          Single Task
        </Typography>
        {todo && (
          <div className={s.container}>
            <div className={s.textContainer}>
              <p className={s.text}>{todo?.description}</p>
              <div className={s.footerCard}>
                <div className={s.timeContainer}>
                  <time className={s.time} dateTime={todo?.createdAt}>
                    Created: {convertDate(todo?.createdAt)}
                  </time>
                  <time className={s.time} dateTime={todo?.updatedAt}>
                    Updated: {convertDate(todo?.updatedAt)}
                  </time>
                </div>
                {todo?.completed ? (
                  <span className={s.completed}>Completed</span>
                ) : (
                  <span className={s.pending}>Incompleted</span>
                )}
              </div>
            </div>
            <div className={s.buttonContainer}>
              <button onClick={onClickUpdateTask} className={s.updateBtn}>
                {!todo?.completed ? 'Check completed' : 'Check incompleted'}
              </button>
              <button onClick={handleOpenModal} className={s.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Container>
      <Modal
        onDelete={onClickDeleteTask}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
}

export default SingleTaskPage;
