import {
  ADD_USER,
  FETCH_ALL_USERS,
  FETCH_USER,
  UPDATE_USER,
  SET_CURRENT_USER
} from "./types";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const apiUrl = "http://localhost:4000/users";

export const createUser = (user, history) => {
  return dispatch => {
    return axios
      .post(`${apiUrl}/add`, user)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch(createUserSuccess(response.data));
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateUser = (id, user) => {
  return dispatch => {
    return axios
      .put(`${apiUrl}/update/${id}`, user)
      .then(res => {
        console.log(res.data);
        dispatch(updateUserSuccess(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateUserSuccess = data => {
  return {
    type: UPDATE_USER,
    payload: data
  };
};

export const createUserSuccess = data => {
  return {
    type: ADD_USER,
    payload: {
      _id: data._id,
      name: data._id,
      emailId: data.emailId,
      avatarUrl: data.avatarUrl
    }
  };
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const fetchUsers = users => {
  return {
    type: FETCH_ALL_USERS,
    users
  };
};

export const fetchAllUsers = () => {
  return dispatch => {
    return axios
      .get(apiUrl)
      .then(response => {
        dispatch(fetchUsers(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchUserSuccess = user => {
  return {
    type: FETCH_USER,
    user
  };
};

export const fetchUser = id => {
  return dispatch => {
    return axios
      .get(`${apiUrl}/user/${id}`)
      .then(response => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push(ROUTES.LANDING);
};
