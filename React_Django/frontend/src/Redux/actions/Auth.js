import { USER_LOADING, USER_LOADED, AUTH_ERRORS, LOGIN_SUCCESS } from "./types";
import Axios from "axios";
import { createErrorMessage } from "./Messages";

// Check Token and load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  //const token
  const token = getState().authReducer.token;

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  Axios.get("/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      const errors = {
        responseMessage: error.response.data,
        status: error.response.status,
      };
      dispatch(createErrorMessage(errors));
      dispatch({ type: AUTH_ERRORS });
    });
};

// login and load user
export const loginUser = (username, password) => (dispatch) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  Axios.post("/api/auth/login", { username, password }, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      const errors = {
        responseMessage: error.response.data,
        status: error.response.status,
      };
      dispatch(createErrorMessage(errors));
      dispatch({ type: AUTH_ERRORS });
    });
};
