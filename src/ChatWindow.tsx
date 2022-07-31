import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import {
  ChatWindowProps,
  PlainFunction,
  MessageObject,
  ReduxState,
} from "./interfaces";
import { connect } from "react-redux";
import { setMessages } from "./actions";

const ChatWindow = (props: ChatWindowProps) => {
  const { name, sendMessage, socket, messages, setMessages } = props;
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSubmit: PlainFunction = () => {
    if (currentMessage) {
      const messageObject = { name, message: currentMessage };
      setCurrentMessage("");
      sendMessage(messageObject);
    }
  };

  useEffect(() => {
    console.log(socket);
    if (!socket.listeners("message").length) {
      socket.on("message", (msg: MessageObject) => {
        setMessages(msg);
      });
    }
  }, [socket, setMessages]);

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg) => (
          <ChatMessage
            name={msg.name}
            message={msg.message}
            sentByMe={msg.name === name}
          />
        ))}
      </div>
      <div className="msg-input-wrap">
        <input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          className="msg-input"
        />
        <button onClick={handleSubmit} className="msg-button">
          Send
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => {
  return {
    ...state,
  };
};

export default connect<any, any, any, any>(mapStateToProps, {
  setMessages,
})(ChatWindow);
