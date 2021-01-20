import "./messages.css";

const Messages = ({ visible, isCorrect }) => {
  if (isCorrect) return null;

  if (visible) return <div className="incorrect-message">incorrect</div>;

  return null;
};

export default Messages;
