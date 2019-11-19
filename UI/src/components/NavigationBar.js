import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer as WithRouter } from "react-router-bootstrap";
import "../css/NavigationBar.scss";

import { IsAuthenticated, RegisterListener, UnregisterListener } from '../services/AuthenticationService.js';



export class NavigationBar extends React.Component {
    
  constructor(props){
      super(props);
      this.state = { authenticated : IsAuthenticated() };
      this.authStateChange = ()=> this.setState({authenticated : IsAuthenticated()});
  }
  
  componentDidMount() {
      RegisterListener(this.authStateChange);
  }

  componentWillUnmount() {
      UnregisterListener(this.authStateChange);
  }
  
  renderProtectedLinks = ()=>
      (
      <React.Fragment>

          <Nav.Item>            
              <WithRouter to="/global"><Nav.Link>Global</Nav.Link></WithRouter>      
          </Nav.Item>
          
          <Nav.Item>            
              <WithRouter to="/finance"><Nav.Link>Finance</Nav.Link></WithRouter>      
          </Nav.Item>

          <Nav.Item>            
              <WithRouter to="/sales"><Nav.Link>Sales</Nav.Link></WithRouter>      
          </Nav.Item>

          <Nav.Item>            
              <WithRouter to="/HR"><Nav.Link>Human Resources</Nav.Link></WithRouter>      
          </Nav.Item>

          <Nav.Item>            
              <WithRouter to="/engineering"><Nav.Link>Engineering</Nav.Link></WithRouter>      
          </Nav.Item>

  </React.Fragment>
        )
    
    renderPublicLinks = ()=>
    (
        <React.Fragment>
            <Nav.Item><WithRouter to="/LogIn" ><Nav.Link>Log In</Nav.Link></WithRouter></Nav.Item>
            <Nav.Item><WithRouter to="/Register"><Nav.Link>Register</Nav.Link></WithRouter></Nav.Item>
        </React.Fragment>
    )
    
    render() {
        const links = this.state.authenticated ? this.renderProtectedLinks() : this.renderPublicLinks();
        return (
        <Navbar expand= "lg">
            <WithRouter to="/"><Navbar.Brand>COSC 4351 GROUP PROJECT</Navbar.Brand></WithRouter>
            <Nav className="ml-auto">
                    <Nav.Item><WithRouter to="/" ><Nav.Link>Home</Nav.Link></WithRouter></Nav.Item>
                    {links}
                </Nav>
        </Navbar> 
        );
    }
}
