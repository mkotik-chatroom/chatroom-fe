import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";
import socket from "./socket";

const ChatWindow = () => {
  const [client, setClient] = useState<any>(socket());
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleSubmit: () => void = () => {
    const newMessages = [...messages];
    newMessages.push(currentMessage);
    client.sendChat(newMessages);
  };
  useEffect(() => {
    setClient(socket());
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (client.socket.listeners("chat message").length < 1) {
      client.socket.on("chat message", (msgs: string[]) => {
        setMessages(msgs);
      });
    }
  }, [client]);

  return (
    <div>
      <div className="chat-container">
        <ChatMessage name="Marat" message="hey" sentByMe={true} />
        <ChatMessage name="Stacy" message="whats up" sentByMe={false} />
      </div>
      <div className="msg-input-wrap">
        <input className="msg-input" />
        <button className="msg-button">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
