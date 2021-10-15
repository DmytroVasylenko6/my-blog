import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import CustomError from '../common/CustomError';

import registerSchema from '../../utils/schemas/RegisterSchema';
import routes from '../../utils/routes';
import authOperations from '../../redux/auth/auth-operation';

import s from './RegisterForm.module.scss';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const onRegister = useCallback(
    state => dispatch(authOperations.register(state)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        age: '',
      }}
      validationSchema={registerSchema}
      onSubmit={values => {
        onRegister(values);
      }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.registerForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            type="text"
            autoFocus
            error={errors.name && touched.name ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage component={CustomError} name="name" />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="age"
            type="number"
            id="age"
            error={errors.age && touched.age ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage component={CustomError} name="age" />

          <Button
            type="submit"
            fullWidth
            variant="dashed"
            color="primary"
            className={s.submitButton}>
            Register
          </Button>

          <Link to={routes.login} className={s.loginLink}>
            Go to login
          </Link>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;
