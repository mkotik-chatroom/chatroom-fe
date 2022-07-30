import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ChatWindowProps, PlainFunction, MessageObject } from "./interfaces";
import { connect } from "react-redux";
import { setMessages } from "./actions";

const ChatWindow = (props: any) => {
  const { name, message, sendMessage, socket } = props;
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleSubmit: PlainFunction = () => {
    const messageObject = { name, message: currentMessage };
    setCurrentMessage("");
    sendMessage(messageObject);
  };

  useEffect(() => {
    if (!socket._callbacks.$message) {
      console.log(socket);
      socket.on("message", (msg: MessageObject) => {
        console.log(msg);
        props.setMessages(msg);
      });
    }
  }, [socket]);

  return (
    <div>
      <div className="chat-container">
        {props.messages.map((msg: any) => (
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

const mapStateToProps = (state: any) => {
  return {
    ...state,
  };
};

export default connect<any, any, any>(mapStateToProps, { setMessages })(
  ChatWindow
);
