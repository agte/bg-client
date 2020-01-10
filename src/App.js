import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import client from './feathers';

import './App.css';

import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import GuestMain from './pages/GuestMain.js';

import SignOut from './components/SignOut.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, authenticated: false };

    client
      .authentication.getAccessToken()
      .then((token) => token ? client.reAuthenticate() : null);

    client.on('login', ({ user }) => {
      this.setState({ user, authenticated: true });
    });

    client.on('logout', () => {
      this.setState({ user: null, authenticated: false });
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Router history={createBrowserHistory()}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5">
                  <Link component={RouterLink} color="inherit" underline="none" to="/">
                    Мухожук
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/sign-in"><SignIn /></Route>
              <Route path="/sign-up"><SignUp /></Route>
              <Route path="/sign-out"><SignOut /></Route>
              <Route path="/">{!this.state.authenticated ? <GuestMain /> : null}</Route>
            </Switch>
            <footer>
              {this.state.authenticated ? <RouterLink to='/sign-out'>Выйти</RouterLink> : null}
            </footer>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
