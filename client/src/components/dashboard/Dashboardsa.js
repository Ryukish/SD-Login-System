import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { linksOfUser  } from "../../actions/authActions";
const isEmpty = require("is-empty");

class saDashboard extends Component {
  constructor() {
    super();
    this.state = {
      results:{}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.results){
      this.setState({
        results : nextProps.results
      });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    
  const { user } = this.props.auth;
  var results = this.state.results;
  var mes3="";
  if(!isEmpty(results)){
    var i;
    var n = results.length;
     for(i = 0; i<n; i++){
      mes3+= "["+results[i] + "]";
    }
    mes3 = mes3.replace("[null]","");
    mes3 = mes3.replace("[]","");
    mes3 = mes3.replace("[undefined]","");
  }
  else{
    this.props.linksOfUser({'role':localStorage.getItem("role")})
  }
return [ 
  <div class = "col s12">
            <nav>
            <div class="nav-wrapper blue">
              <ul id="nav-mobile" class="left hide-on-med-and-down">  
                <li><Link to="/sadashboard"> <b>Home</b></Link></li>              
                <li><Link to="/assignrole">Assign Role</Link></li>
                <li><Link to="/addrole">Add Role</Link></li>
                <li><Link to="/delrole">Delete Role</Link></li>
                <li><Link to="/modrole">Modify Role</Link></li>
                <li><Link to="/addlinks">Add Links</Link></li>
                <li><Link to="/dellinks">Delete Links</Link></li>
                <li><Link to="/modlinks">Modify Links</Link></li>
                <li><Link to="/linksofarole">Links of a Role</Link></li>  
                <li><b>Company XYZ - SuperAdmin Tools</b></li>
              </ul>
            </div>
            </nav>
        </div>,
      <div style={{ height: "75vh" }} className="valign-wrapper white">
        <div className="row">
          <div className="col s12 center-align">
            <h4> 
              
              <b>Hey there SuperAdmin,</b> {user.name}
              <p className="flow-text grey-text text-darken-1">
                You are logged into admin portal for Company XYZ
                {localStorage.getItem("links")}
              </p>
              {mes3}
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    ];   
  }
}
saDashboard.propTypes = {
  linksOfUser : PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  results: state.results
});
export default connect(
  mapStateToProps,
  { logoutUser, linksOfUser }
)(saDashboard);