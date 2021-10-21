import React, { useCallback, useState } from 'react';
import s from './FormAddTask.module.scss';
import { Formik, Form, ErrorMessage } from 'formik';
import CustomError from '../common/CustomError';
import { TextField, Button, Typography } from '@mui/material';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';

export default function FormAddTask() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onAddTask = useCallback(
    async state => {
      setIsLoading(true);
      await dispatch(taskOperations.taskAdd(state));
      setIsLoading(false);
    },
    [dispatch],
  );
  return (
    <>
      <Typography variant="h3" component="h3">
        Add new task
      </Typography>
      <Formik
        initialValues={{
          description: '',
        }}
        onSubmit={(values, { resetForm }) => {
          onAddTask(values);
          resetForm({});
        }}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className={s.formAddTask}>
            <TextField
              value={values.description}
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
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#202020"
                  height="100%"
                  width={40}
                />
              ) : (
                'Add'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
