import { useState } from "react";
import ChatWindow from "./ChatWindow";
import NameInput from "./NameInput";
import socket from "./socket";
import "./App.css";

function App() {
  const [name, setName] = useState<string>("");

  const handleNameSubmit: (inputValue: string) => void = (inputValue) => {
    setName(inputValue);
  };
  socket();
  return (
    <div className="app">
      <div>
        {name ? (
          <ChatWindow />
        ) : (
          <NameInput handleNameSubmit={handleNameSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
