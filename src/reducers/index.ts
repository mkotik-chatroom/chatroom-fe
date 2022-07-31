import { SET_MESSAGES } from "../actions";
import { Reducer, ReducersMapObject, AnyAction } from "redux";
import { ReduxState } from "../interfaces";

const initialState: ReduxState = {
  messages: [],
};

export const reducer: Reducer | ReducersMapObject = (
  state: ReduxState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_MESSAGES: {
      const newState: ReduxState = {
        ...state,
        messages: [...state.messages, action.payload],
      };
      return newState;
    }
    default:
      return state;
  }
};
