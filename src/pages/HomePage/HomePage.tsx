import Container from '../../components/common/Container';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import s from './HomePage.module.scss';
import image from '../../images/chermander.gif';
import routes from '../../utils/routes';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <Container>
        <Typography gutterBottom={true} variant="h1">
          Welcome!
        </Typography>
        <Typography variant="h2">
          Your to-do list is waiting for you. <br />
          <Link className={s.link} to={routes.todos}>
            Click here
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
