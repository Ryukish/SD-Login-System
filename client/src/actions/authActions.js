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

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/lar/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      const {role }= res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      axios.post("api/sa/linksofrole", {"role" : role}).then(resl => {
        const { links } = resl.data;
        localStorage.setItem("links", links)
      });
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  
  
};

export const linksOfUser = () => dispatch => {
  var r = localStorage.getItem("role");
  axios
  .post("api/sa/linksofrole", {"role" : r})
  .then(resl => {
    const { links } = resl.data;
    localStorage.setItem("links", links)
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
export const modlinks = (roleAndLinks) => dispatch => {
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

// Set logged in user
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

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};