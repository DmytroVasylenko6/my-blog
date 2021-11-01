import { useCallback, useState } from 'react';
import s from './FormAddTask.module.scss';
import { Formik, Form, ErrorMessage } from 'formik';
import CustomError from '../common/CustomError';
import { TextField, Button, Typography } from '@mui/material';
import taskOperations from '../../redux/tasks/tasks-operations';
import { useAppDispatch } from '../../hooks/redux-hooks';
import Loader from 'react-loader-spinner';
import { FormattedMessage } from 'react-intl';

interface IValues {
  description: string;
}

export default function FormAddTask() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
        <FormattedMessage
          id="app.addtaskform.title"
          defaultMessage="Add new task"
        />
      </Typography>
      <Formik
        initialValues={{
          description: '',
        }}
        onSubmit={(values: IValues, { resetForm }) => {
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
              label={
                <FormattedMessage
                  id="app.addtaskform.label"
                  defaultMessage="Your task"
                />
              }
              name="description"
              autoFocus
              multiline
              rows={4}
              error={errors.description && touched.description ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage
              render={message => <CustomError>{message}</CustomError>}
              name="description"
            />
            <Button
              type="submit"
              fullWidth
              // variant="dashed"
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
                <FormattedMessage
                  id="app.addtaskform.button"
                  defaultMessage="Add"
                />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
