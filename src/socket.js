const io = require("socket.io-client");

const socket = () => {
  const port =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://chatroom-be-production.up.railway.app/";
  const socket = io(port, {
    extraHeaders: {
      "Access-Control-Allow-Credentials": "true",
    },
  });

  socket.on("error", (err) => console.log("socket error:", err));

  const sendMessage = (messageObject) => {
    if (socket) socket.emit("message", messageObject);
  };

  const sendTypingNotice = () => {
    if (socket) socket.emit("typing");
  };

  return {
    sendMessage,
    sendTypingNotice,
  };
};

export default socket;
