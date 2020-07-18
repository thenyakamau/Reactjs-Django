import { GET_MESSAGES } from "../actions/types";

const initialState = {
  responseMessage: {},
  isError: false,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        responseMessage: action.payload.responseMessage,
        isError: action.payload.isError,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
