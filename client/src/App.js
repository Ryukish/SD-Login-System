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
import PrivateRouteSA from "./components/private-route/PrivateRouteSA";
import Dashboard from "./components/dashboard/Dashboard";
import saDashboard from "./components/dashboard/Dashboardsa";
import assignrole from "./components/SAactions/Assignrole";
import addrole from "./components/SAactions/Addrole";
import addlinks from "./components/SAactions/Addlinks";
import delrole from "./components/SAactions/Delrole";
import dellinks from "./components/SAactions/Dellinks";
import modlink from "./components/SAactions/Modlinks";
import modrole from "./components/SAactions/Modrole";
import linksofarole from "./components/SAactions/Linksofarole";

import { Layout } from './components/Layout';
import { Jumbotron } from './components/Jumbotron';
import { LogOff } from './components/LogOff';
import { Container } from 'react-bootstrap';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
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
              <PrivateRouteSA exact path="/sadashboard" component={saDashboard} />
              <PrivateRoute redirectTo="/LogIn" path= "/LogOff" component={LogOff}/>
              <PrivateRouteSA exact path="/assignrole" component={assignrole} />
              <PrivateRouteSA exact path="/addrole" component={addrole} />
              <PrivateRouteSA exact path="/delrole" component={delrole} />
              <PrivateRouteSA exact path="/modrole" component={modrole} />
              <PrivateRouteSA exact path="/modlinks" component={modlink} />
              <PrivateRouteSA exact path="/addlinks" component={addlinks} />
              <PrivateRouteSA exact path="/dellinks" component={dellinks} />
              <PrivateRouteSA exact path="/linksofarole" component={linksofarole} />
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