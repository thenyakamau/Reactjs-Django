import { GET_ERRORS } from "../actions/types";

const initialState = {
  responseMessage: {},
  isError: false,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        responseMessage: action.payload.responseMessage,
        isError: true,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
