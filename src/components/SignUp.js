import React from 'react';
import { withRouter } from "react-router-dom";

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
    const { email: { value: email }, password: { value: password } } = event.target.elements;
    client
      .service('users')
      .create({ email, password })
      .then(() => client.authenticate({ strategy: 'local', email, password }))
      .then(() => { this.props.history.push('/'); })
      .catch((e) => { alert(e.message); });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" align="center" gutterBottom>Зарегистрироваться</Typography>
        <form onSubmit={this.onSubmit}>
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
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
            label="Password"
            margin="normal"
            name="password"
            required
            size="medium"
            type="password"
            variant="outlined"
          />
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
