import AccountForm from '../../components/AccountForm/AccountForm';
import Container from '../../components/common/Container';
import s from './AccountPage.module.scss';

function AccountPage() {
  return (
    <div className={s.accountPage}>
      <Container>
        <AccountForm />
      </Container>
    </div>
  );
}

export default AccountPage;
