import { Socket } from "socket.io-client";
import { MapStateToProps } from "react-redux";

export interface MessageObject {
  name: string;
  message: string;
}

export interface ChatWindowProps {
  name: string;
  sendMessage: (msg: MessageObject) => void;
  socket: Socket;
  messages: MessageObject[];
  setMessages: ReduxFunction<MessageObject>;
}

export interface ReduxState {
  messages: MessageObject[];
}

export interface ChatMessageProps {
  name: string;
  message: string;
  sentByMe: boolean;
}

export type MapState = MapStateToProps<any, any, ReduxState>;

export type PlainFunction = () => void;

export type ReduxFunction<T> = (payload: T) => { type: string; payload: T };
