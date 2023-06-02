import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import NameInput from "./components/NameInput";
import { MessageObject } from "./interfaces";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [name, setName] = useState<string>("");
  // test
  useEffect(() => {
    if (!socket) {
      setSocket(
        io(
          "https://chatroom-be-production.up.railway.app/",
          // "http://localhost:8000",
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

  const sendTypingNotice = (): void => {
    if (socket) socket.emit("typing");
  };

  const handleNameSubmit = (inputValue: string): void => {
    setName(inputValue);
  };
  return (
    <div className="app">
      <div>
        {name ? (
          <ChatWindow
            name={name}
            sendMessage={sendMessage}
            sendTypingNotice={sendTypingNotice}
            socket={socket}
          />
        ) : (
          <NameInput handleNameSubmit={handleNameSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
