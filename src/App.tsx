import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import ChatWindow from "./ChatWindow";
import NameInput from "./NameInput";
import io from "socket.io-client";
import { MessageObject } from "./interfaces";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!socket) {
      setSocket(
        io(
          // "http://chatroombe-env.eba-mtuquxgv.us-east-2.elasticbeanstalk.com/",
          "http://localhost:8000",
          {
            extraHeaders: {
              "Access-Control-Allow-Credentials": "true",
            },
          }
        )
      );
    }
  }, [socket]);

  const sendMessage = (messageObject: MessageObject): void => {
    if (socket) socket.emit("message", messageObject);
  };

  const handleNameSubmit = (inputValue: string): void => {
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
