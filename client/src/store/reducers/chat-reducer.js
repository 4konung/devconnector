import { GET_ALL_MESSAGES, RESET_MESSAGES, GET_MESSAGE } from "../actions/types";

const initialState = { messages: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES: {
      return {
        messages: action.payload
      }
    }
    case GET_MESSAGE: {
      return {
        messages: [...state.messages, action.payload]
      }
    }
    case RESET_MESSAGES: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
