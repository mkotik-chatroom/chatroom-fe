import { SET_MESSAGES } from "../actions";

const initialState: any = {
  messages: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGES: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    default:
      return state;
  }
};

export default reducer;
