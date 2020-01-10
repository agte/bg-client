import React from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import client from '../feathers';

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    client
      .logout()
      .then(() => { this.props.history.push('/'); })
      .catch((e) => { alert(e.message); });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={this.onSubmit}
        >
          Sign Out
        </Button>
      </Container>
    );
  }
}

export default withRouter(SignOut);
