import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import CustomError from '../common/CustomError';

import loginSchema from '../../utils/schemas/LoginSchema';
import authOperations from '../../redux/auth/auth-operation';
import routes from '../../utils/routes';
import { TextField, Button } from '@mui/material';
import s from './LoginForm.module.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const onLogin = useCallback(
    state => dispatch(authOperations.logIn(state)),
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
            variant="dashed"
            color="primary"
            className={s.submitButton}>
            Log in
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
