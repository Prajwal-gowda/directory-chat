import {
  ADD_USER,
  FETCH_ALL_USERS,
  FETCH_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  FETCH_PRIVATE_CHATS,
  FETCH_SEARCH_USERS,
  FETCH_EMPLOYEES
} from "./types";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { API_CONSTANTS } from "../../constants/api";

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

// Update User

export const updateUser = (id, user) => {
  return dispatch => {
    return axios
      .put(`${apiUrl}/update/${id}`, user)
      .then(res => {
        dispatch(updateUserSuccess(res.data));
        dispatch(setCurrentUser(res.data));
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

//Get All Users

export const fetchUsers = users => {
  return {
    type: FETCH_ALL_USERS,
    users
  };
};

export const fetchAllUsers = pageNo => {
  return dispatch => {
    return axios
      .get(apiUrl, {
        params: {
          pageNo: pageNo
        }
      })
      .then(response => {
        dispatch(fetchUsers(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

//Set current user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//get current user details

export const fetchUserSuccess = currentUser => {
  return {
    type: FETCH_USER,
    currentUser
  };
};

export const fetchUser = id => {
  return dispatch => {
    return axios
      .get(`${apiUrl}/getuser/${id}`)
      .then(response => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

// fetch search user

export const fetchSearchUser = data => {
  return dispatch => {
    return axios
      .get(`${apiUrl}/search`, {
        params: {
          searchString: data
        }
      })
      .then(response => {
        console.log(response.data);
        dispatch(fetchSearchUserSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
export const fetchSearchUserSuccess = searchUsers => {
  return {
    type: FETCH_SEARCH_USERS,
    searchUsers
  };
};
//logout action

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push(ROUTES.LANDING);
};

export const fetchAllEmployees = data => {
  let pageNo = data + 1;
  return dispatch => {
    return axios
      .get(`${apiUrl}/employees`, {
        params: {
          pageNo: pageNo
        }
      })
      .then(response => {
        console.log(response.data);
        dispatch(fetchAllEmployeesSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
export const fetchAllEmployeesSuccess = employees => {
  return {
    type: FETCH_EMPLOYEES,
    employees
  };
};

export const fetchPrivateChats = chats => {
  return {
    type: FETCH_PRIVATE_CHATS,
    payload: chats
  };
};

export const getPrivateMessages = (url, senderId, recieverId) => {
  return dispatch => {
    return axios
      .get(url, {
        params: {
          senderId: senderId,
          recieverId: recieverId
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch(fetchPrivateChats(res.data));
        // cb(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
