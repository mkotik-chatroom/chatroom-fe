import { useState } from "react";

const ChatWindow = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleSubmit: () => void = () => {
    const newMessages = [...messages];
    newMessages.push(currentMessage);
    setMessages(newMessages);
    setCurrentMessage("");
  };
  return (
    <div style={{ backgroundColor: "grey" }}>
      <div
        style={{
          margin: "auto",
          width: "70%",
          height: "60vh",
          textAlign: "left",
          padding: "20px 0px",
        }}
      >
        {messages.map((message) => {
          return <p>{message}</p>;
        })}
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "transparent",
          paddingBottom: "20px",
          width: "70%",
          margin: "auto",
        }}
      >
        <input
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          value={currentMessage}
          style={{
            width: "100%",
            height: "30px",
            marginRight: "10px",
            marginTop: "10px",
            padding: "5px 20px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            height: "34px",
            width: "100px",
            marginTop: "10px",
            marginBottom: "0px",
            padding: "0px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
