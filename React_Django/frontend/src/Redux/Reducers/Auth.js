import {
  USER_LOADING,
  AUTH_ERRORS,
  USER_LOADED,
  LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case AUTH_ERRORS:
      localStorage.removeItem("authToken");
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
}
