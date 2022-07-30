import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import NameInput from "./NameInput";
import io from "socket.io-client";
import { MessageObject } from "./interfaces";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<any>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!socket) {
      setSocket(
        io("http://localhost:5050/", {
          extraHeaders: {
            "Access-Control-Allow-Credentials": "true",
          },
        })
      );
    }
  }, []);

  const sendMessage = (messageObject: MessageObject) => {
    socket.emit("message", messageObject);
  };

  const handleNameSubmit: (inputValue: string) => void = (inputValue) => {
    setName(inputValue);
  };
  return (
    <div className="app">
      <div>
        {name ? (
          <ChatWindow name={name} sendMessage={sendMessage} socket={socket} />
        ) : (
          <NameInput handleNameSubmit={handleNameSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
