import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import client from '../feathers';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
      name: { value: name },
    } = event.target.elements;
    
    client
      .service('users')
      .create({ email, password, name })
      .then(() => client.authenticate({ strategy: 'local', email, password }))
      .then(() => { this.props.history.push('/'); })
      .catch((e) => {
        console.error(e);
        alert('Произошла ошибка. Свяжитесь с администратором сайта.');
      });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h1" align="center">Зарегистрироваться</Typography>
        <form onSubmit={this.onSubmit}>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email"
            margin="normal"
            name="email"
            required
            size="medium"
            type="email"
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Пароль"
            margin="normal"
            name="password"
            required
            size="medium"
            type="password"
            variant="outlined"
          />
          <TextField
            autoComplete="username"
            fullWidth
            id="name"
            label="Имя"
            margin="normal"
            name="name"
            required
            size="medium"
            variant="outlined"
          />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Готово
          </Button>
        </form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
