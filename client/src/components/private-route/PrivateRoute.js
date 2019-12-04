import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      if (auth.isAuthenticated && localStorage.getItem("role") !== "SUPERADMIN")
        return (<Component {...props}/>) ;
      else if (auth.isAuthenticated && localStorage.getItem("role") === "SUPERADMIN")
        return <Redirect to="/sadashboard" /> ;
      else{
        return <Redirect to="/login" />;
      }
    }}
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);