import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser} from "../../actions/authActions";
import { linksOfUser  } from "../../actions/authActions";
const isEmpty = require("is-empty");

class Dashboard extends Component {
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
<div style={{ height: "75vh", width : "75vh"}}  className="col s12 row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name}
              <p className="flow-text grey-text text-darken-1">
                You are logged into admin portal Company XYZ                
              </p>
              {mes3}
            </h4>
          </div>
          <div className="col s6 offset-s3" style={{ paddingLeft: "100.250px" }}>
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

];
  }
}
Dashboard.propTypes = {
  linksOfUser : PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  results: state.results
});
export default connect(
  mapStateToProps, { logoutUser, linksOfUser } ) (Dashboard);