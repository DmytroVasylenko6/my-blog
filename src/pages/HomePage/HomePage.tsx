import Container from '../../components/common/Container';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import s from './HomePage.module.scss';
import image from '../../images/chermander.gif';
import routes from '../../utils/routes';
import { FormattedMessage } from 'react-intl';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <Container>
        <Typography gutterBottom={true} variant="h1">
          <FormattedMessage id="app.homepage.title" defaultMessage="Welcome!" />
        </Typography>
        <Typography variant="h2">
          <FormattedMessage
            id="app.homepage.subtitle"
            defaultMessage="Your to-do list is waiting for you."
          />
          <br />
          <Link className={s.link} to={routes.todos}>
            <FormattedMessage
              id="app.homepage.link"
              defaultMessage="Click here"
            />
          </Link>
        </Typography>
        <div className={s.imageContainer}>
          <img src={image} alt="chermander gif" />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
