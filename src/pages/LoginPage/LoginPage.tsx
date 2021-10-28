import LoginForm from '../../components/LoginForm';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={s.loginPage}>
      <Container>
        <Typography variant="h1">Log in</Typography>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
