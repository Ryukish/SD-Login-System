import axios from "axios";

import { GET_ALL_USERS, GET_ERRORS } from "./types";

// GET ALL USERS
export const getAllUsers = () => dispatch => {
    axios
        .post("/api/admin/getAllUsers")
        .then(res =>
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data.users
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// UPDATE USER ROLES
export const updateUserRole = (data) => dispatch => {
    axios
        .post("/api/admin/updateUserRole", data)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};