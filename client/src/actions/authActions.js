import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, RETURN_SUCCESS } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/lar/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/lar/login", userData)
    .then(res => {
      const { token } = res.data;
      const {role }= res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  
  
};

export const linksOfUser = (role) => dispatch => {
  axios
  .post("api/sa/lou", role)
  .then(resl => {
   dispatch(returnSuccess(resl.data));
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const assignroleUser = (emailAndRole) => dispatch => {

  axios
  .post("api/sa/assignrole", emailAndRole)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const createrole = (roleAndLinks) => dispatch => {
  axios
  .post("api/sa/addrole", roleAndLinks)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const deleterole = (role) => dispatch => {
  axios
  .post("api/sa/deleterole", role)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const modrolea= (roleAndRolechange) => dispatch => {
  axios
  .post("api/sa/modrole", roleAndRolechange)
  .then(res => {
    dispatch(returnSuccess(res.data))
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const linksofrole = (role) => dispatch => {
  axios
  .post("api/sa/linksofrole", role)
  .then(res => {
    dispatch(returnSuccess(res.data));
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const addlinks = (roleAndLinks) => dispatch => {
  axios
  .post("api/sa/addlinks", roleAndLinks)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const deletelinks = (roleAndLinks) => dispatch => {
  axios
  .post("api/sa/deletelinks", roleAndLinks)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const modlinks = (roleLinksAndNewLinks) => dispatch => {
  axios
  .post("api/sa/modlinks", roleLinksAndNewLinks)
  .then(res => {
    dispatch(returnSuccess(res.data));
}).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const returnSuccess = results => {
  return {
    type: RETURN_SUCCESS,
    payload: results
  }
}

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};