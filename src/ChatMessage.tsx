interface ChatMessageProps {
  name: string;
  message: string;
  sentByMe: boolean;
}

const ChatMessage = ({ name, message, sentByMe }: ChatMessageProps) => {
  return (
    <div className={`${sentByMe ? "text-right" : "text-left"} chat-message`}>
      <p className="chat-message-name">{name}: </p>
      <p className="chat-message-content">{message}</p>
    </div>
  );
};

export default ChatMessage;
