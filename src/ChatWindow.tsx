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
  const { name, sendMessage, sendTypingNotice, socket, messages, setMessages } =
    props;
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [otherUserTyping, setOtherUserTyping] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    sendTypingNotice();
    setCurrentMessage(e.target.value);
  };

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
        setOtherUserTyping(false);
        setMessages(msg);
      });
    }
    if (!socket.listeners("typing").length) {
      socket.on("typing", () => {
        if (!otherUserTyping) setOtherUserTyping(true);
      });
    }
  }, [socket, setMessages, otherUserTyping]);

  useEffect(() => {
    if (otherUserTyping) {
      setTimeout(() => {
        setOtherUserTyping(false);
      }, 2000);
    }
  }, [otherUserTyping]);

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, i) => (
          <ChatMessage
            name={msg.name}
            message={msg.message}
            sentByMe={msg.name === name}
            key={i}
          />
        ))}
        {otherUserTyping && <p>typing...</p>}
      </div>
      <div className="msg-input-wrap">
        <input
          value={currentMessage}
          onChange={(e) => handleChange(e)}
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
