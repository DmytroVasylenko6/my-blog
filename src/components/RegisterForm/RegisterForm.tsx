import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import CustomError from '../common/CustomError';
import registerSchema from '../../utils/schemas/RegisterSchema';
import routes from '../../utils/routes';
import authOperations from '../../redux/auth/auth-operation';
import Loader from 'react-loader-spinner';
import s from './RegisterForm.module.scss';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

interface IValues {
  name: string | null;
  email: string | null;
  password: string | null;
  age: number | null;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onRegister = useCallback(
    async state => {
      setIsLoading(true);
      await dispatch(authOperations.register(state));
      setIsLoading(false);
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        age: 0,
      }}
      validationSchema={registerSchema}
      onSubmit={(values: IValues) => {
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
            label={
              <FormattedMessage
                id="app.registerform.name"
                defaultMessage="Name"
              />
            }
            data-testid="name"
            name="name"
            type="text"
            autoFocus
            error={errors.name && touched.name ? true : false}
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
            name="name"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label={
              <FormattedMessage
                id="app.registerform.email"
                defaultMessage="Email"
              />
            }
            data-testid="email"
            type="email"
            id="email"
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
                id="app.registerform.password"
                defaultMessage="Password"
              />
            }
            data-testid="password"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label={
              <FormattedMessage
                id="app.registerform.age"
                defaultMessage="Age"
              />
            }
            data-testid="age"
            type="number"
            id="age"
            error={errors.age && touched.age ? true : false}
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
            name="age"
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
                id="app.registerform.button"
                defaultMessage="Register"
              />
            )}
          </Button>

          <Link
            to={routes.login}
            className={classNames(
              [s.loginLink, 'theme-light-text', 'theme-light-hover'].join(' '),
            )}>
            <FormattedMessage
              id="app.registerform.link"
              defaultMessage="Go to login"
            />
          </Link>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;
