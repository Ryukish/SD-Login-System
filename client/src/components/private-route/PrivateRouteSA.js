import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRouteSA = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      if (auth.isAuthenticated && localStorage.getItem("role") === "SUPERADMIN"){
        return <Component {...props} />;
      }
      else{
        return <Redirect to="/login" />;
      }
    }}
  />
);
PrivateRouteSA.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRouteSA);