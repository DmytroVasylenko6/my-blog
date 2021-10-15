import React, { useCallback } from 'react';
import s from './FormAddTask.module.scss';
import { Formik, Form, ErrorMessage } from 'formik';
import CustomError from '../common/CustomError';
import { TextField, Button, Typography } from '@mui/material';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useDispatch } from 'react-redux';

export default function FormAddTask() {
  const dispatch = useDispatch();
  const onAddTask = useCallback(
    state => dispatch(taskOperations.taskAdd(state)),
    [dispatch],
  );
  return (
    <>
      <Typography variant="h3" component="h3">
        Add new task
      </Typography>
      <Formik
        initialValues={{
          text: '',
        }}
        //   validationSchema={loginSchema}
        onSubmit={values => {
          // onLogin(values);
          onAddTask(values);
        }}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className={s.formAddTask}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Your task"
              name="description"
              autoFocus
              multiline
              rows={4}
              error={errors.description && touched.description ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage component={CustomError} name="description" />
            <Button
              type="submit"
              fullWidth
              variant="dashed"
              color="primary"
              className={s.submitButton}>
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
