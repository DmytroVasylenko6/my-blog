import { React } from 'react';
import RegisterForm from '../../components/RegisterForm';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './RegisterPage.module.scss';

const LoginPage = () => {
  return (
    <div className={s.registerPage}>
      <Container>
        <Typography variant="h1">Registration</Typography>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default LoginPage;
