import React, { SetStateAction, useState } from "react";

const ChatWindow = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleSubmit = () => {
    const newMessages = [...messages];
    newMessages.push(currentMessage);
    setMessages(newMessages);
    setCurrentMessage("");
  };
  return (
    <div>
      <div>
        {messages.map((message) => {
          return <p>{message}</p>;
        })}
      </div>
      <div style={{ display: "flex" }}>
        <input
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ChatWindow;
