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
import SignOut from './pages/SignOut.js';
import GuestMain from './pages/GuestMain.js';
import Main from './pages/Main.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, auth: false }; // "authenticated" is to long so let's use "auth"
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    client
      .authentication.getAccessToken()
      .then((token) => token && client.reAuthenticate());

    client.on('login', this.onLogin);
    client.on('logout', this.onLogout);
  }

  componentWillUnmount() {
    client.off('login', this.onLogin);
    client.off('logout', this.onLogout);
  }

  onLogin({ user }) {
    this.setState({ user, auth: true });
  }

  onLogout() {
    this.setState({ user: null, auth: false });
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
                <div style={{flexGrow: 1}}></div>
                {this.state.auth && <Link component={RouterLink} color="inherit" to='/sign-out'>Выйти</Link>}
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/sign-in"><SignIn /></Route>
              <Route path="/sign-up"><SignUp /></Route>
              <Route path="/sign-out"><SignOut /></Route>
              <Route path="/">{!this.state.auth ? <GuestMain /> : <Main />}</Route>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
