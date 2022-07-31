import { MessageObject, ReduxFunction } from "../interfaces";

export const SET_MESSAGES = "SET_MESSAGES";

export const setMessages: ReduxFunction<MessageObject> = (messageObject) => {
  return { type: SET_MESSAGES, payload: messageObject };
};
