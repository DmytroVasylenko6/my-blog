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
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

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
            label={
              <FormattedMessage
                id="app.loginform.email"
                defaultMessage="Email"
              />
            }
            name="email"
            autoFocus
            error={errors.email && touched.email ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            render={message => (
              <CustomError>
                <FormattedMessage
                  id={message}
                  defaultMessage="This field is error!"
                />
              </CustomError>
            )}
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={
              <FormattedMessage
                id="app.loginform.password"
                defaultMessage="Password"
              />
            }
            type="password"
            id="password"
            error={errors.password && touched.password ? true : false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            render={message => (
              <CustomError>
                <FormattedMessage
                  id={message}
                  defaultMessage="This field is error!"
                />
              </CustomError>
            )}
            name="password"
          />
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
              <FormattedMessage
                id="app.loginform.button"
                defaultMessage="Log in"
              />
            )}
          </Button>

          <Link
            to={routes.register}
            className={classNames(
              [s.registerLink, 'theme-light-text', 'theme-light-hover'].join(
                ' ',
              ),
            )}>
            <FormattedMessage
              id="app.loginform.link"
              defaultMessage="Go to registration"
            />
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
