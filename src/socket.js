const io = require("socket.io-client");

const socketFunc = () => {
  const port =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5050"
      : "http://localhost:5050";
  // const socket = io.connect(port);

  const socket = io("http://localhost:5050/", {
    extraHeaders: {
      "my-custom-header": "abcd",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  const sendChat = (message) => {
    socket.emit("chat message", message);
  };

  return { sendChat, socket };
};

export default socketFunc;
