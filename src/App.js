import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import SignIn from './components/SignIn.js';
import SignOut from './components/SignOut.js';
import SignUp from './components/SignUp.js';

import client from './feathers';

const browserHistory = createBrowserHistory();

function Main() {
  return (<div>Главная</div>);
}

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
          <Router history={browserHistory}>
            <Switch>
              <Route path="/sign-in">
                <Link to='/'>На главную</Link>
                <SignIn />
              </Route>
              <Route path="/sign-out">
                <Link to='/'>На главную</Link>
                <SignOut />
              </Route>
              <Route path="/sign-up">
                <Link to='/'>На главную</Link>
                <SignUp />
              </Route>
              <Route path="/">
                {!this.state.authenticated ? <Link to='/sign-in'>Войти</Link> : null}
                {this.state.authenticated ? <Link to='/sign-out'>Выйти</Link> : null}
                {!this.state.authenticated ? <Link to='/sign-up'>Зарегистрироваться</Link> : null}
                <Main />
              </Route>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
