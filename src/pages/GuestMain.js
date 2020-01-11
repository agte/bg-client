import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class GuestMain extends React.Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h1" align="center">Настольные игры онлайн</Typography>
        <p>
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            component={RouterLink}
            to="/sign-in"
          >
            Войти
          </Button>
        </p>
        <p>
          <Button
            color="default"
            fullWidth
            size="large"
            variant="contained"
            component={RouterLink}
            to="/sign-up"
          >
            Зарегистрироваться
          </Button>
        </p>
      </Container>
    );
  }
}

export default GuestMain;
