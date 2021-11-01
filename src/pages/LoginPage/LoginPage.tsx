import LoginForm from '../../components/LoginForm';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './LoginPage.module.scss';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
  return (
    <div className={s.loginPage}>
      <Container>
        <Typography variant="h1">
          <FormattedMessage id="app.loginpage.title" defaultMessage="Log in" />
        </Typography>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
