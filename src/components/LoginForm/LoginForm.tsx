import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import CustomError from '../common/CustomError';
import loginSchema from '../../utils/schemas/LoginSchema';
import authOperations from '../../redux/auth/auth-operation';
import routes from '../../utils/routes';
import { TextField, Button } from '@mui/material';
import s from './LoginForm.module.scss';
import Loader from 'react-loader-spinner';

interface IValues {
  email: string | null;
  password: string | null;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onLogin = useCallback(
    async state => {
      setIsLoading(true);
      await dispatch(authOperations.logIn(state));
      // setIsLoading(false);
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values: IValues) => {
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
          <ErrorMessage render={message => <CustomError>{message}</CustomError>} name="email" />
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
          <ErrorMessage render={message => <CustomError>{message}</CustomError>} name="password" />
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
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
