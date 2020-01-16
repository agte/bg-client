import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import client from './feathers';

import './App.css';

import GuestMain from './pages/GuestMain.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import Main from './pages/Main.js';
import SignOut from './pages/SignOut.js';
import Matches from './pages/Matches.js';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.0rem',
      marginTop: '1em',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.33rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
  },
});

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
      .then((token) => token && client.reAuthenticate())
      .catch((e) => {
        console.log(e);
      });

    client.on('login', this.onLogin);
    client.on('logout', this.onLogout);
  }

  componentWillUnmount() {
    client.off('login', this.onLogin);
    client.off('logout', this.onLogout);
  }

  onLogin({ user }) {
    client.user = user;
    this.setState({ user, auth: true });
  }

  onLogout() {
    client.user = null;
    this.setState({ user: null, auth: false });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h4" component="div">
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
                <Route path="/matches"><Matches /></Route>
                <Route path="/">{!this.state.auth ? <GuestMain /> : <Main />}</Route>
              </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
