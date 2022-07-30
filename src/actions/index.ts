export const SET_MESSAGES = "SET_MESSAGES";

export const setMessages = (messageObject: any) => {
  return { type: SET_MESSAGES, payload: messageObject };
};
