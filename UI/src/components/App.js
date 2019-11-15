import React, { Component } from 'react';
import "../css/App.css";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import { Global } from './Global';
import { Finance } from './Finance';
import { Sales } from './Sales';
import { HR } from './HR';
import { Engineering } from './Engineering';
import { LogIn } from './LogIn';
import { LogOff } from './LogOff';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from './Layout';
import { NavigationBar } from './NavigationBar';
import { Jumbotron } from './Jumbotron';
import { Container } from 'react-bootstrap';
  




class App extends Component {
  render() {
    return (
      <Container>
        <Router>
            <NavigationBar />
            <Jumbotron />
            <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path= "/Register"component={Register}/>
              <Route path= "/LogIn" component={LogIn}/>

              <ProtectedRoute redirectTo="/LogIn" path="/global" component={Global} />
              <ProtectedRoute redirectTo="/LogIn" path="/finance" component={Finance} />
              <ProtectedRoute redirectTo="/LogIn" path="/sales" component={Sales} />
              <ProtectedRoute redirectTo="/LogIn" path="/HR" component={HR} />
              <ProtectedRoute redirectTo="/LogIn" path="/engineering" component={Engineering} />
              <ProtectedRoute redirectTo="/LogIn" path= "/LogOff" component={LogOff}/>
              <Route>
                <div><h2>404</h2></div>
              </Route>
            </Switch>
            </Layout>
        </Router>

      </Container>
    );
  }
}

export default App;