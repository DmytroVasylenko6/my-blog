import { React } from 'react';
import Container from '../../components/common/Container';
import { Typography } from '@mui/material';
import s from './HomePage.module.scss';
import image from '../../images/chermander.gif';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <Container>
        <Typography gutterBottom={true} variant="h1">
          Welcome!
        </Typography>
        <Typography variant="h2">
          Your to-do list is waiting for you:)
        </Typography>
        <div className={s.imageContainer}>
          <img src={image} alt="chermander gif" />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
