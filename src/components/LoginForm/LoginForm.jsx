import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import CustomError from '../common/CustomError';

import loginSchema from '../../utils/schemas/LoginSchema';
import authOperations from '../../redux/auth/auth-operation';
import routes from '../../utils/routes';
import { TextField, Button } from '@mui/material';
import s from './LoginForm.module.scss';
import Loader from 'react-loader-spinner';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onLogin = useCallback(
    async state => {
      setIsLoading(true);
      await dispatch(authOperations.logIn(state));
      setIsLoading(false);
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={values => {
        onLogin(values);
      }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.loginForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            error={errors.email && touched.email ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage component={CustomError} name="email" />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={errors.password && touched.password ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage component={CustomError} name="password" />
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
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
              'Log in'
            )}
          </Button>

          <Link to={routes.register} className={s.registerLink}>
            Go to registration
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
