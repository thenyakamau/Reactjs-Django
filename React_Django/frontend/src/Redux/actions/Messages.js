import { GET_MESSAGES, GET_ERRORS } from "./types";

//Create Messages
export const createSuccessMessage = (responseMessage) => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: {
      responseMessage: responseMessage,
      isError: false,
      status: null,
    },
  });
};

export const createErrorMessage = (errors) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: errors,
  });
};
