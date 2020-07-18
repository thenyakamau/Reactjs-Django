import { GET_MESSAGES } from "./types";

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
