import { useState, useEffect } from 'react';
import s from './SingleTaskPage.module.scss';
import Container from '../../components/common/Container';
import convertDate from '../../utils/convertDate';
import { Typography } from '@mui/material';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import routes from '../../utils/routes';
import Modal from '../../components/Modal';
import todosAPI from '../../utils/todosAPI';
import notifInfo from '../../redux/notification/notif-actions';
import Loader from 'react-loader-spinner';
import CustomLoader from '../../components/common/Loader';


interface ILocation {
  from: string;
}

interface IParams {
  todosId: string | number
}

interface ITodo {
  completed: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const initialTodo: ITodo = {
  completed: false,
  description: '',
  createdAt: '',
  updatedAt: '',
} as ITodo

function SingleTaskPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<string>('');
  const [isDelete, setIsDelete] = useState<string>('');
  const [todo, setTodo] = useState<ITodo>(initialTodo);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation<ILocation>();
  const params = match.params as IParams;
  const todosId = params.todosId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    todosAPI
      .getTaskById(todosId)
      .then((response: any) => {
        setTodo(response.data.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
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
    setIsUpdate('update');
    if (todo) {
       try {
      const response = await todosAPI.updateTaskById(todosId, {
        completed: !todo.completed,
      });
      setTodo(response.data.data);
      dispatch(
        notifInfo({
          message: 'Task successfully updated!',
          status: true,
          severity: 'success',
        }),
      );
      setIsUpdate('');
    } catch (error: any) {
      dispatch(
        notifInfo({
          message: error.message,
          status: true,
          severity: 'error',
        }),
      );
      setIsUpdate('');
    }
    }
   
  };

  const onClickDeleteTask = async () => {
    handleCloseModal();
    setIsDelete('delete');
    const response = await dispatch(taskOperations.taskDelete(todosId));
    if (response?.data?.success) {
      history.push(routes.todos);
    }
    setIsDelete('');
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
        {isLoading ? (
          <div className={s.loaderContainer}>
            <CustomLoader />
          </div>
        ) : (
          todo && (
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
                  {isUpdate === 'update' ? (
                    <Loader
                      type="ThreeDots"
                      color="#202020"
                      height="100%"
                      width={40}
                    />
                  ) : !todo?.completed ? (
                    'Check completed'
                  ) : (
                    'Check incompleted'
                  )}
                </button>
                <button onClick={handleOpenModal} className={s.deleteBtn}>
                  {isDelete === 'delete' ? (
                    <Loader
                      type="ThreeDots"
                      color="#202020"
                      height="100%"
                      width={40}
                    />
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </Container>
      <Modal
        onDelete={onClickDeleteTask}
        open={openModal}
        handleClose={handleCloseModal}
        title="Are you sure you want to delete this task?"
      />
    </div>
  );
}

export default SingleTaskPage;
