import React, { useEffect, createRef } from 'react';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './TasksPage.module.scss';
import FormAddTask from '../../components/FormAddTask';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useDispatch } from 'react-redux';
import getTasks from '../../redux/tasks/tasks-selectors';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import TaskCard from '../../components/TaskCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TodosPage = () => {
  const tasksList = useSelector(getTasks);
  const reverseTasksList = [...tasksList].reverse();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(taskOperations.taskParse());
  }, [dispatch]);

  return (
    <div className={s.todosPage}>
      <Container>
        <Typography gutterBottom={true} variant="h1">
          Your tasks!
        </Typography>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="space-between">
          <Grid item xs={3}>
            <FormAddTask />
          </Grid>
          <Grid item xs={9}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start">
              <TransitionGroup component={null} className={s.list}>
                {reverseTasksList.map(
                  ({ _id, description, createdAt, completed }) => {
                    const item = createRef(null);
                    return (
                      <CSSTransition
                        key={_id}
                        timeout={500}
                        classNames="task-scale"
                        appear={true}
                        nodeRef={item}
                        unmountOnExit>
                        <Grid ref={item} item xs={4} key={_id}>
                          <TaskCard
                            id={_id}
                            description={description}
                            createdAt={createdAt}
                            completed={completed}
                          />
                        </Grid>
                      </CSSTransition>
                    );
                  },
                )}
              </TransitionGroup>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TodosPage;
