export interface MessageObject {
  name: string;
  message: string;
}

export interface ChatWindowProps {
  name: string;
  sendMessage: (msg: MessageObject) => void;
  socket: any;
}

export type PlainFunction = () => void;
