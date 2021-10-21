import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import accountSchema from '../../utils/schemas/AccountSchema';
import authOperations from '../../redux/auth/auth-operation';
import s from './AccountForm.module.scss';
import authSelectors from '../../redux/auth/auth-selectors';
import UploadButton from '../../components/UploadImage';
import Modal from '../Modal';
import Loader from 'react-loader-spinner';

const AccountForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isButton, setIsButton] = useState('');
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const user = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();
  const onUpdate = useCallback(
    async state => {
      setIsButton('update');
      await dispatch(authOperations.updateUser(state));
      setIsButton('');
    },
    [dispatch],
  );

  const onDeleteUser = useCallback(
    async state => {
      handleCloseModal();
      setIsButton('delete');
      await dispatch(authOperations.deleteUser(state));
      setIsButton('');
    },
    [dispatch],
  );

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      age: user.age,
    },
    validationSchema: accountSchema,
    onSubmit: values => {
      onUpdate(values);
    },
  });

  return (
    <>
      <UploadButton />
      <form className={s.accountForm} onSubmit={formik.handleSubmit}>
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
          value={formik.values.name}
          error={formik.errors.name && formik.touched.name ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          value={formik.values.email}
          error={formik.errors.email && formik.touched.email ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="age"
          label="age"
          type="number"
          id="age"
          value={formik.values.age}
          error={formik.errors.age && formik.touched.age ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.age && formik.errors.age}
        />
        <div className={s.buttonContainer}>
          <Button
            type="submit"
            fullWidth
            variant="dashed"
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
              'Update'
            )}
          </Button>
          <Button
            onClick={handleOpenModal}
            fullWidth
            variant="dashed"
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
              'Delete'
            )}
          </Button>
        </div>
      </form>
      <Modal
        onDelete={onDeleteUser}
        open={openModal}
        handleClose={handleCloseModal}
        title="Are you sure you want to delete this account?"
      />
    </>
  );
};
export default AccountForm;
