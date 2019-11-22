import React, { Component } from "react";
import "./css/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

  
import { Global } from './components/Global';
import { Finance } from './components/Finance';
import { Sales } from './components/Sales';
import { HR } from './components/HR';
import { Engineering } from './components/Engineering';
import { Layout } from './components/Layout';
import { Jumbotron } from './components/Jumbotron';
import { LogOff } from './components/LogOff';
import { Container } from 'react-bootstrap';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
} 
class App extends Component {
  render() {
    return (
      <Container>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Jumbotron />
            <Layout>
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              
              <PrivateRoute redirectTo="/LogIn" path="/global" component={Global} />
              <PrivateRoute redirectTo="/LogIn" path="/finance" component={Finance} />
              <PrivateRoute redirectTo="/LogIn" path="/sales" component={Sales} />
              <PrivateRoute redirectTo="/LogIn" path="/HR" component={HR} />
              <PrivateRoute redirectTo="/LogIn" path="/engineering" component={Engineering} />
              <PrivateRoute redirectTo="/LogIn" path= "/LogOff" component={LogOff}/>
              <Route>
                <div><h2>404</h2></div>
              </Route>
            </Switch>
            </Layout>
          </div>

          
        </Router>
      </Provider>
      </Container>
    );
  }
}
export default App;