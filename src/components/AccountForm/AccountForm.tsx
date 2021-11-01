import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField, Button } from '@mui/material';
import accountSchema from '../../utils/schemas/AccountSchema';
import authOperations from '../../redux/auth/auth-operation';
import s from './AccountForm.module.scss';
import authSelectors from '../../redux/auth/auth-selectors';
import UploadButton from '../UploadImage';
import Modal from '../Modal';
import Loader from 'react-loader-spinner';
import CustomError from '../common/CustomError';
import { FormattedMessage } from 'react-intl';

interface IValues {
  name: string | null;
  email: string | null;
  age: number | null;
}

const AccountForm = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isButton, setIsButton] = useState<string>('');
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const user = useAppSelector(authSelectors.getUser);

  const dispatch = useAppDispatch();
  const onUpdate = useCallback(
    async state => {
      setIsButton('update');
      await dispatch(authOperations.updateUser(state));
      setIsButton('');
    },
    [dispatch],
  );

  const onDeleteUser = useCallback(async () => {
    handleCloseModal();
    setIsButton('delete');
    await dispatch(authOperations.deleteUser());
    setIsButton('');
  }, [dispatch]);

  return (
    <>
      <UploadButton />
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          age: user.age,
        }}
        validationSchema={accountSchema}
        onSubmit={(values: IValues) => {
          onUpdate(values);
        }}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className={s.accountForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label={
                <FormattedMessage
                  id="app.profileform.name"
                  defaultMessage="Name"
                />
              }
              name="name"
              type="text"
              autoFocus
              value={values.name}
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
                  id="app.profileform.email"
                  defaultMessage="Email"
                />
              }
              type="email"
              id="email"
              value={values.email}
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
              name="age"
              label={
                <FormattedMessage
                  id="app.profileform.age"
                  defaultMessage="Age"
                />
              }
              type="number"
              id="age"
              value={values.age}
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
            <div className={s.buttonContainer}>
              <Button
                type="submit"
                fullWidth
                // variant="dashed"
                color="primary"
                className={s.submitButton}>
                {isButton === 'update' ? (
                  <Loader
                    type="ThreeDots"
                    color="#202020"
                    height="100%"
                    width={40}
                  />
                ) : (
                  <FormattedMessage
                    id="app.profileform.button.update"
                    defaultMessage="Update"
                  />
                )}
              </Button>
              <Button
                onClick={handleOpenModal}
                fullWidth
                // variant="dashed"
                color="primary"
                className={s.deleteButton}>
                {isButton === 'delete' ? (
                  <Loader
                    type="ThreeDots"
                    color="#202020"
                    height="100%"
                    width={40}
                  />
                ) : (
                  <FormattedMessage
                    id="app.profileform.button.delete"
                    defaultMessage="Delete"
                  />
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        onDelete={onDeleteUser}
        open={openModal}
        handleClose={handleCloseModal}
        title={
          <FormattedMessage
            id="app.profileform.modal.title"
            defaultMessage="Are you sure you want to delete this account?"
          />
        }
      />
    </>
  );
};
export default AccountForm;
