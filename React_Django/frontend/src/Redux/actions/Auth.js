import { USER_LOADING, USER_LOADED, AUTH_ERRORS, LOGIN_SUCCESS } from "./types";
import Axios from "axios";
import { createErrorMessage } from "./Messages";
import TokenConfig from "../../components/utils/TokenConfig";

// Check Token and load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  let config = TokenConfig(getState);
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
export const loginUser = (username, password) => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  let config = TokenConfig(getState);
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

// login and load user
export const createUser = (username, email, password) => (
  dispatch,
  getState
) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  let config = TokenConfig(getState);

  Axios.post("/api/auth/register", { username, email, password }, config)
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

//LogOut User
export const logOutUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });
  let config = TokenConfig(getState);
  Axios.post("/api/auth/logout", null, config)
    .then((res) => {
      dispatch({
        type: AUTH_ERRORS,
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
