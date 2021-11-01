import RegisterForm from '../../components/RegisterForm';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './RegisterPage.module.scss';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
  return (
    <div className={s.registerPage}>
      <Container>
        <Typography variant="h1">
          <FormattedMessage
            id="app.registerpage.title"
            defaultMessage="Registration"
          />
        </Typography>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default LoginPage;
